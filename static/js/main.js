// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.documentElement.classList.toggle('dark');
            
            // Save the preference
            if (document.documentElement.classList.contains('dark')) {
                localStorage.theme = 'dark';
            } else {
                localStorage.theme = 'light';
            }
        });
    }
    
    // Check for saved theme preference
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Flash message auto-dismiss
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(function(message) {
        setTimeout(function() {
            message.classList.add('opacity-0');
            setTimeout(function() {
                message.remove();
            }, 300);
        }, 5000);
    });
    
    // Scan page - Tab switching
    const fileTabBtn = document.getElementById('fileTabButton');
    const urlTabBtn = document.getElementById('urlTabButton');
    const fileTab = document.getElementById('fileTab');
    const urlTab = document.getElementById('urlTab');
    
    if (fileTabBtn && urlTabBtn && fileTab && urlTab) {
        fileTabBtn.addEventListener('click', function() {
            fileTabBtn.classList.add('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600', 'dark:border-blue-400');
            fileTabBtn.classList.remove('text-gray-600', 'dark:text-gray-400');
            
            urlTabBtn.classList.remove('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600', 'dark:border-blue-400');
            urlTabBtn.classList.add('text-gray-600', 'dark:text-gray-400');
            
            fileTab.classList.remove('hidden');
            urlTab.classList.add('hidden');
        });
        
        urlTabBtn.addEventListener('click', function() {
            urlTabBtn.classList.add('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600', 'dark:border-blue-400');
            urlTabBtn.classList.remove('text-gray-600', 'dark:text-gray-400');
            
            fileTabBtn.classList.remove('text-blue-600', 'dark:text-blue-400', 'border-b-2', 'border-blue-600', 'dark:border-blue-400');
            fileTabBtn.classList.add('text-gray-600', 'dark:text-gray-400');
            
            urlTab.classList.remove('hidden');
            fileTab.classList.add('hidden');
        });
    }
    
    // File upload handling
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('file');
    const browseButton = document.getElementById('browseButton');
    const fileInfo = document.getElementById('fileInfo');
    const fileName = document.getElementById('fileName');
    const fileSize = document.getElementById('fileSize');
    const removeFileBtn = document.getElementById('removeFile');
    const fileSubmitButton = document.getElementById('fileSubmitButton');
    
    if (dropZone && fileInput && browseButton) {
        // Format file size
        function formatFileSize(bytes) {
            if (bytes < 1024) return bytes + ' bytes';
            else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
            else return (bytes / 1048576).toFixed(1) + ' MB';
        }
        
        // Update file info and enable submit button
        function handleFile(file) {
            if (file.name.endsWith('.php')) {
                fileName.textContent = file.name;
                fileSize.textContent = formatFileSize(file.size);
                fileInfo.classList.remove('hidden');
                fileSubmitButton.classList.remove('bg-gray-400', 'cursor-not-allowed');
                fileSubmitButton.classList.add('bg-blue-600', 'hover:bg-blue-700');
                fileSubmitButton.disabled = false;
            } else {
                alert('Only PHP files are allowed');
                fileInput.value = '';
            }
        }
        
        // Browse button click
        browseButton.addEventListener('click', function() {
            fileInput.click();
        });
        
        // File input change
        fileInput.addEventListener('change', function() {
            if (fileInput.files.length > 0) {
                handleFile(fileInput.files[0]);
            }
        });
        
        // Drag and drop
        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', function() {
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                handleFile(e.dataTransfer.files[0]);
            }
        });
        
        // Remove file
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', function() {
                fileInput.value = '';
                fileInfo.classList.add('hidden');
                fileSubmitButton.classList.add('bg-gray-400', 'cursor-not-allowed');
                fileSubmitButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                fileSubmitButton.disabled = true;
            });
        }
    }
    
    // Help modal functionality
    const helpButton = document.getElementById('helpButton');
    const helpModal = document.getElementById('helpModal');
    const closeHelpModal = document.getElementById('closeHelpModal');
    
    if (helpButton && helpModal && closeHelpModal) {
        helpButton.addEventListener('click', function() {
            helpModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
        
        closeHelpModal.addEventListener('click', function() {
            helpModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        helpModal.addEventListener('click', function(e) {
            if (e.target === helpModal) {
                helpModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Scan result - Vulnerability details toggle
    const toggleDetailsBtns = document.querySelectorAll('.toggle-details');
    
    toggleDetailsBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const details = this.closest('.vulnerability-item').querySelector('.vulnerability-details');
            const icon = this.querySelector('.details-icon');
            
            details.classList.toggle('hidden');
            
            if (details.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
    });
    
    // Filter functionality in scan results
    const filterBtns = document.querySelectorAll('.filter-btn');
    const vulnerabilityItems = document.querySelectorAll('.vulnerability-item');
    
    if (filterBtns.length > 0 && vulnerabilityItems.length > 0) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                const severity = this.getAttribute('data-severity');
                
                vulnerabilityItems.forEach(function(item) {
                    if (severity === 'all' || item.getAttribute('data-severity') === severity) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
                
                // Update active filter
                filterBtns.forEach(function(b) {
                    b.classList.remove('ring-2', 'ring-gray-400', 'dark:ring-gray-500');
                });
                this.classList.add('ring-2', 'ring-gray-400', 'dark:ring-gray-500');
            });
        });
    }
    
    // Search functionality in history page
    const searchInput = document.getElementById('searchInput');
    const scansTable = document.getElementById('scansTable');
    
    if (searchInput && scansTable) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = scansTable.querySelectorAll('tbody tr');
            
            rows.forEach(function(row) {
                const source = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const type = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (source.includes(searchTerm) || type.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
});