import re
import os
import json
import requests
from modules.vulnerability_patterns import VULNERABILITY_PATTERNS

def analyze_php_file(filepath):
    """
    Analyze a PHP file for vulnerabilities
    
    Args:
        filepath (str): Path to the PHP file
        
    Returns:
        dict: Analysis results containing vulnerabilities found
    """
    if not os.path.exists(filepath):
        return {"error": "File not found"}
    
    try:
        with open(filepath, 'r') as file:
            content = file.read()
        return analyze_php_content(content)
    except Exception as e:
        return {"error": str(e)}

def analyze_php_url(url):
    """
    Analyze a PHP website by fetching its source code
    
    Args:
        url (str): URL of the PHP website
        
    Returns:
        dict: Analysis results containing vulnerabilities found
    """
    try:
        # Check if URL has protocol prefix
        if not url.startswith(('http://', 'https://')):
            url = 'http://' + url
            
        response = requests.get(url, timeout=10)
        
        # Check if the response is successful
        if response.status_code != 200:
            return {"error": f"Failed to fetch URL. Status code: {response.status_code}"}
        
        # Check if the content is PHP
        content_type = response.headers.get('Content-Type', '')
        if 'php' not in content_type and 'html' not in content_type:
            return {"error": "The URL does not appear to be a PHP or HTML page"}
        
        return analyze_php_content(response.text)
    except requests.exceptions.RequestException as e:
        return {"error": f"Error fetching URL: {str(e)}"}

def analyze_php_content(content):
    """
    Analyze PHP content for vulnerabilities
    
    Args:
        content (str): PHP code content
        
    Returns:
        dict: Analysis results containing vulnerabilities found
    """
    results = {
        "summary": {
            "total_vulnerabilities": 0,
            "high_severity": 0,
            "medium_severity": 0,
            "low_severity": 0
        },
        "vulnerabilities": []
    }
    
    line_number = 1
    lines = content.split('\n')
    
    # Analyze each line for vulnerabilities
    for line_content in lines:
        for pattern_name, pattern_info in VULNERABILITY_PATTERNS.items():
            pattern = pattern_info['pattern']
            severity = pattern_info['severity']
            
            # Find all matches in the current line
            matches = re.finditer(pattern, line_content)
            
            for match in matches:
                # Extract matched code snippet
                code_snippet = line_content.strip()
                
                # Add the vulnerability to the results
                vulnerability = {
                    "type": pattern_name,
                    "severity": severity,
                    "line_number": line_number,
                    "code_snippet": code_snippet,
                    "remediation": pattern_info['remediation']
                }
                
                results["vulnerabilities"].append(vulnerability)
                
                # Update summary counts
                results["summary"]["total_vulnerabilities"] += 1
                results["summary"][f"{severity.lower()}_severity"] += 1
        
        line_number += 1
    
    return results