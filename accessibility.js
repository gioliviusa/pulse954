// Pulse954 Accessibility Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const accessibilityToggle = document.getElementById('accessibilityToggle');
    const accessibilityPanel = document.getElementById('accessibilityPanel');
    const fontSmaller = document.getElementById('fontSmaller');
    const fontBigger = document.getElementById('fontBigger');
    const fontSizeDisplay = document.getElementById('fontSizeDisplay');
    const highContrastToggle = document.getElementById('highContrastToggle');
    const dyslexiaToggle = document.getElementById('dyslexiaToggle');
    const resetAccessibility = document.getElementById('resetAccessibility');
    const successMessage = document.getElementById('accessibilitySuccessMessage');
    const messageText = document.getElementById('accessibilityMessageText');
    
    let fontSize = 100;
    let isHighContrast = false;
    let isDyslexiaFont = false;
    
    function loadSavedSettings() {
        const savedFontSize = localStorage.getItem('pulse954AccessibilityFontSize');
        const savedHighContrast = localStorage.getItem('pulse954AccessibilityHighContrast');
        const savedDyslexiaFont = localStorage.getItem('pulse954AccessibilityDyslexiaFont');
        
        if (savedFontSize) {
            fontSize = parseInt(savedFontSize);
            updateFontSize();
        }
        
        if (savedHighContrast === 'true') {
            isHighContrast = true;
            document.body.classList.add('high-contrast');
            highContrastToggle.classList.add('active');
        }
        
        if (savedDyslexiaFont === 'true') {
            isDyslexiaFont = true;
            document.body.classList.add('dyslexia-font');
            dyslexiaToggle.classList.add('active');
        }
        
        updateButtonStates();
    }
    
    function showSuccessMessage(text) {
        messageText.textContent = text;
        successMessage.classList.add('show');
        setTimeout(() => { successMessage.classList.remove('show'); }, 3000);
    }
    
    function updateFontSize() {
        document.documentElement.style.fontSize = fontSize + '%';
        fontSizeDisplay.textContent = fontSize + '%';
        localStorage.setItem('pulse954AccessibilityFontSize', fontSize);
        updateButtonStates();
    }
    
    function updateButtonStates() {
        const isMinSize = fontSize <= 80;
        const isMaxSize = fontSize >= 150;
        fontSmaller.disabled = isMinSize;
        fontBigger.disabled = isMaxSize;
        fontSmaller.setAttribute('aria-disabled', isMinSize);
        fontBigger.setAttribute('aria-disabled', isMaxSize);
    }
    
    function increaseFontSize() {
        if (fontSize < 150) {
            fontSize += 10;
            updateFontSize();
            showSuccessMessage('Font size increased to ' + fontSize + '%');
        }
    }
    
    function decreaseFontSize() {
        if (fontSize > 80) {
            fontSize -= 10;
            updateFontSize();
            showSuccessMessage('Font size decreased to ' + fontSize + '%');
        }
    }
    
    accessibilityToggle.addEventListener('click', function() {
        const isExpanded = accessibilityPanel.classList.toggle('active');
        this.setAttribute('aria-expanded', isExpanded);
        if (isExpanded) {
            setTimeout(() => { fontSmaller.focus(); }, 100);
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!accessibilityPanel.contains(event.target) && 
            !accessibilityToggle.contains(event.target) && 
            accessibilityPanel.classList.contains('active')) {
            accessibilityPanel.classList.remove('active');
            accessibilityToggle.setAttribute('aria-expanded', 'false');
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && accessibilityPanel.classList.contains('active')) {
            accessibilityPanel.classList.remove('active');
            accessibilityToggle.setAttribute('aria-expanded', 'false');
            accessibilityToggle.focus();
        }
    });
    
    fontSmaller.addEventListener('click', decreaseFontSize);
    fontBigger.addEventListener('click', increaseFontSize);
    
    highContrastToggle.addEventListener('click', function() {
        isHighContrast = !isHighContrast;
        if (isHighContrast) {
            document.body.classList.add('high-contrast');
            this.classList.add('active');
            showSuccessMessage('High contrast mode enabled');
        } else {
            document.body.classList.remove('high-contrast');
            this.classList.remove('active');
            showSuccessMessage('High contrast mode disabled');
        }
        localStorage.setItem('pulse954AccessibilityHighContrast', isHighContrast);
    });
    
    highContrastToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
    
    dyslexiaToggle.addEventListener('click', function() {
        isDyslexiaFont = !isDyslexiaFont;
        if (isDyslexiaFont) {
            document.body.classList.add('dyslexia-font');
            this.classList.add('active');
            showSuccessMessage('Dyslexia-friendly font enabled');
        } else {
            document.body.classList.remove('dyslexia-font');
            this.classList.remove('active');
            showSuccessMessage('Dyslexia-friendly font disabled');
        }
        localStorage.setItem('pulse954AccessibilityDyslexiaFont', isDyslexiaFont);
    });
    
    dyslexiaToggle.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
    
    resetAccessibility.addEventListener('click', function() {
        fontSize = 100;
        updateFontSize();
        isHighContrast = false;
        document.body.classList.remove('high-contrast');
        highContrastToggle.classList.remove('active');
        localStorage.setItem('pulse954AccessibilityHighContrast', false);
        isDyslexiaFont = false;
        document.body.classList.remove('dyslexia-font');
        dyslexiaToggle.classList.remove('active');
        localStorage.setItem('pulse954AccessibilityDyslexiaFont', false);
        showSuccessMessage('All accessibility settings have been reset');
        setTimeout(() => {
            accessibilityPanel.classList.remove('active');
            accessibilityToggle.setAttribute('aria-expanded', 'false');
            accessibilityToggle.focus();
        }, 500);
    });
    
    resetAccessibility.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
    
    loadSavedSettings();
});
