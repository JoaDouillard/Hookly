// JavaScript principal pour le nouveau design Hookly

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de tous les composants
    initMobileMenu();
    initNavigationSlider();
    initContactForm();
    initSocialNetworks();
    initSmoothScrolling();
});

/**
 * Gestion du menu mobile
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!mobileToggle || !mobileNav) return;
    
    mobileToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Animation du bouton hamburger
        const spans = mobileToggle.querySelectorAll('span');
        if (mobileToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
        
        // Accessibilité
        const isOpen = mobileNav.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Fermer le menu quand on clique sur un lien
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            
            // Reset du bouton hamburger
            const spans = mobileToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
    
    // Fermer le menu avec Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Gestion du slider de navigation dynamique
 */
function initNavigationSlider() {
    const navSlider = document.getElementById('navSlider');
    const navLinks = document.querySelectorAll('.nav-link');
    const activeLink = document.querySelector('.nav-link.active');
    
    if (!navSlider || navLinks.length === 0) return;
    
    // Position initiale du slider sur le lien actif
    function positionSlider(targetLink) {
        if (!targetLink) return;
        
        const linkRect = targetLink.getBoundingClientRect();
        const navRect = targetLink.closest('.main-nav').getBoundingClientRect();
        
        const left = linkRect.left - navRect.left - 4; // 4px = padding de la nav
        const width = linkRect.width;
        const height = linkRect.height;
        
        navSlider.style.left = left + 'px';
        navSlider.style.width = width + 'px';
        navSlider.style.height = height + 'px';
        navSlider.style.opacity = '1';
    }
    
    // Position initiale
    if (activeLink) {
        // Délai pour que le DOM soit complètement chargé
        setTimeout(() => positionSlider(activeLink), 100);
    }
    
    // Hover effect
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            positionSlider(this);
        });
    });
    
    // Retour au lien actif quand on quitte la navigation
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.addEventListener('mouseleave', function() {
            if (activeLink) {
                positionSlider(activeLink);
            } else {
                navSlider.style.opacity = '0';
            }
        });
    }
    
    // Repositionner le slider au redimensionnement
    window.addEventListener('resize', function() {
        if (activeLink) {
            setTimeout(() => positionSlider(activeLink), 100);
        }
    });
}

/**
 * Gestion du formulaire de contact
 */
function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    // Validation en temps réel
    const inputs = form.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

/**
 * Validation d'un champ individuel
 */
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validation selon le type de champ
    switch(fieldName) {
        case 'prenom':
        case 'nom':
            if (!value) {
                isValid = false;
                errorMessage = 'Ce champ est obligatoire';
            } else if (value.length < 2) {
                isValid = false;
                errorMessage = 'Minimum 2 caractères requis';
            }
            break;
            
        case 'email':
            if (!value) {
                isValid = false;
                errorMessage = 'L\'email est obligatoire';
            } else if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Format d\'email invalide';
            }
            break;
            
        case 'objet':
            if (!value) {
                isValid = false;
                errorMessage = 'Veuillez choisir un objet';
            }
            break;
            
        case 'message':
            if (!value) {
                isValid = false;
                errorMessage = 'Le message est obligatoire';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Le message doit contenir au moins 10 caractères';
            }
            break;
    }
    
    // Affichage du résultat
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
        clearFieldError(field);
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Validation de l'email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Affichage d'une erreur de champ
 */
function showFieldError(field, message) {
    const errorElement = document.querySelector(`[data-field="${field.name}"]`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Effacement d'une erreur de champ
 */
function clearFieldError(field) {
    const errorElement = document.querySelector(`[data-field="${field.name}"]`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

/**
 * Validation complète du formulaire
 */
function validateForm() {
    const form = document.querySelector('.contact-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    // Validation des champs requis
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Validation des réseaux sociaux
    const socialNetworks = document.querySelectorAll('.social-network-item');
    socialNetworks.forEach(network => {
        const typeSelect = network.querySelector('.social-type-select');
        const accountInput = network.querySelector('.social-account-input');
        
        if (typeSelect && accountInput) {
            if (typeSelect.value && !accountInput.value.trim()) {
                accountInput.classList.add('error');
                isValid = false;
            } else if (!typeSelect.value && accountInput.value.trim()) {
                typeSelect.classList.add('error');
                isValid = false;
            } else {
                typeSelect.classList.remove('error');
                accountInput.classList.remove('error');
            }
        }
    });
    
    return isValid;
}

/**
 * Soumission du formulaire
 */
function submitForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    
    // État de chargement
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Préparation des données
    const formData = new FormData(form);
    
    // Ajout des réseaux sociaux
    const socialData = collectSocialNetworksData();
    if (socialData.length > 0) {
        formData.append('reseaux-sociaux', JSON.stringify(socialData));
    }
    
    // Soumission via Netlify
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            // Redirection vers la page de remerciement
            window.location.href = '/merci.html';
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.');
    })
    .finally(() => {
        // Retrait de l'état de chargement
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });
}

/**
 * Gestion des réseaux sociaux dynamiques
 */
function initSocialNetworks() {
    const addBtn = document.getElementById('addSocialNetwork');
    const container = document.getElementById('socialNetworksContainer');
    const template = document.getElementById('socialNetworkTemplate');
    
    if (!addBtn || !container || !template) return;
    
    let socialCount = 0;
    const maxSocial = 5;
    
    addBtn.addEventListener('click', function() {
        if (socialCount >= maxSocial) {
            alert(`Maximum ${maxSocial} réseaux sociaux autorisés`);
            return;
        }
        
        addSocialNetwork();
    });
    
    function addSocialNetwork() {
        // Clone du template
        const clone = template.content.cloneNode(true);
        const networkItem = clone.querySelector('.social-network-item');
        
        // Attribution d'un ID unique
        const networkId = 'social-' + Date.now();
        networkItem.setAttribute('data-id', networkId);
        
        // Configuration des champs
        const typeSelect = clone.querySelector('.social-type-select');
        const accountInput = clone.querySelector('.social-account-input');
        const removeBtn = clone.querySelector('.remove-social-btn');
        
        if (typeSelect) {
            typeSelect.name = `social-type-${socialCount}`;
            typeSelect.setAttribute('data-index', socialCount);
        }
        
        if (accountInput) {
            accountInput.name = `social-account-${socialCount}`;
            accountInput.setAttribute('data-index', socialCount);
        }
        
        // Gestionnaire de suppression
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                removeSocialNetwork(networkItem);
            });
        }
        
        // Ajout au container
        container.appendChild(clone);
        socialCount++;
        
        // Mise à jour du bouton d'ajout
        updateAddButton();
        
        // Focus sur le premier champ
        if (typeSelect) {
            setTimeout(() => typeSelect.focus(), 100);
        }
    }
    
    function removeSocialNetwork(networkItem) {
        // Animation de sortie
        networkItem.style.animation = 'slideOut 0.3s ease';
        
        setTimeout(() => {
            networkItem.remove();
            socialCount--;
            updateAddButton();
            
            // Réindexation des champs restants
            reindexSocialFields();
        }, 300);
    }
    
    function updateAddButton() {
        if (socialCount >= maxSocial) {
            addBtn.disabled = true;
            addBtn.innerHTML = `<span>✓</span> Maximum ${maxSocial} réseaux atteint`;
        } else {
            addBtn.disabled = false;
            addBtn.innerHTML = '<span>+</span> Ajouter';
        }
    }
    
    function reindexSocialFields() {
        const networks = container.querySelectorAll('.social-network-item');
        networks.forEach((network, index) => {
            const typeSelect = network.querySelector('.social-type-select');
            const accountInput = network.querySelector('.social-account-input');
            
            if (typeSelect) {
                typeSelect.name = `social-type-${index}`;
                typeSelect.setAttribute('data-index', index);
            }
            
            if (accountInput) {
                accountInput.name = `social-account-${index}`;
                accountInput.setAttribute('data-index', index);
            }
        });
        
        socialCount = networks.length;
    }
}

/**
 * Collecte des données des réseaux sociaux
 */
function collectSocialNetworksData() {
    const networks = document.querySelectorAll('.social-network-item');
    const socialData = [];
    
    networks.forEach(network => {
        const typeSelect = network.querySelector('.social-type-select');
        const accountInput = network.querySelector('.social-account-input');
        
        if (typeSelect && accountInput && typeSelect.value && accountInput.value.trim()) {
            socialData.push({
                type: typeSelect.value,
                account: accountInput.value.trim()
            });
        }
    });
    
    return socialData;
}

/**
 * Défilement fluide vers les ancres
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore les liens vides
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calcul de la position en tenant compte du header fixe
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                // Défilement fluide
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus pour l'accessibilité
                setTimeout(() => {
                    if (target.tabIndex === -1) {
                        target.tabIndex = -1;
                    }
                    target.focus();
                }, 500);
            }
        });
    });
}

/**
 * Animation pour la suppression des réseaux sociaux
 */
const slideOutKeyframes = `
@keyframes slideOut {
    from {
        opacity: 1;
        transform: translateY(0);
        max-height: 200px;
    }
    to {
        opacity: 0;
        transform: translateY(-20px);
        max-height: 0;
        padding: 0;
        margin: 0;
    }
}
`;

// Injection des keyframes dans le CSS
if (!document.querySelector('#slideOutStyles')) {
    const style = document.createElement('style');
    style.id = 'slideOutStyles';
    style.textContent = slideOutKeyframes;
    document.head.appendChild(style);
}

/**
 * Utilitaires pour le débuggage (à supprimer en production)
 */
function debugFormData() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const formData = new FormData(form);
    const socialData = collectSocialNetworksData();
    
    console.log('Form Data:');
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
    console.log('Social Networks:', socialData);
}

// Exposition des fonctions pour le debugging (développement uniquement)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.HooklyDebug = {
        debugFormData,
        validateForm,
        collectSocialNetworksData,
        positionSlider: () => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) initNavigationSlider();
        }
    };
}