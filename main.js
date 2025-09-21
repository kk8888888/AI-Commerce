// AI Commerce Learning Platform - Interactive JavaScript
// Enhanced with comprehensive animations and educational features

class AICommercePlatform {
    constructor() {
        this.currentModule = 'introduction';
        this.startTime = null;
        this.moduleProgress = 0;
        this.totalModules = 6;
        this.timer = null;
        this.courseDuration = 3 * 60 * 60; // 3 hours in seconds
        this.remainingTime = this.courseDuration;
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.initializeEventListeners();
        this.initializeCharts();
        this.setupKeyboardNavigation();
        this.initializeTooltips();
    }

    showLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.animateIntroduction();
                }, 500);
            }
        }, 3000);
    }

    animateIntroduction() {
        const introSection = document.getElementById('introduction');
        if (introSection) {
            introSection.classList.add('animate-fade-in');
        }
    }

    initializeEventListeners() {
        // Add event listeners for all interactive elements
        document.addEventListener('DOMContentLoaded', () => {
            this.setupNavigationListeners();
            this.setupChatbotListeners();
            this.setupSimulationListeners();
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    setupNavigationListeners() {
        // Module navigation
        const moduleButtons = document.querySelectorAll('.module-nav-btn');
        moduleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const module = btn.getAttribute('data-module');
                if (module) {
                    this.showModule(module);
                }
            });
        });

        // Case study navigation
        const caseStudyButtons = document.querySelectorAll('.case-study-btn');
        caseStudyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const caseStudy = btn.getAttribute('data-case');
                if (caseStudy) {
                    this.showCaseStudy(caseStudy);
                }
            });
        });

        // Exercise navigation
        const exerciseButtons = document.querySelectorAll('.exercise-btn');
        exerciseButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exercise = btn.getAttribute('data-exercise');
                if (exercise) {
                    this.showExercise(exercise);
                }
            });
        });
    }

    setupChatbotListeners() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.querySelector('.chat-send-btn');

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => {
                this.sendChatMessage();
            });
        }
    }

    setupSimulationListeners() {
        // Agent simulation listeners
        const agentAvatar = document.getElementById('demo-agent');
        if (agentAvatar) {
            agentAvatar.addEventListener('click', () => {
                this.runAgentSimulation();
            });
        }

        // Environment elements
        const envElements = document.querySelectorAll('.env-element');
        envElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.interactWithEnvironment(e.target);
            });
        });
    }

    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                    e.preventDefault();
                    this.showModule('fundamentals');
                    break;
                case '2':
                    e.preventDefault();
                    this.showModule('commerce');
                    break;
                case '3':
                    e.preventDefault();
                    this.showModule('payments');
                    break;
                case '4':
                    e.preventDefault();
                    this.showModule('case-studies');
                    break;
                case '5':
                    e.preventDefault();
                    this.showModule('exercises');
                    break;
                case '6':
                    e.preventDefault();
                    this.showModule('future');
                    break;
                case 'r':
                    e.preventDefault();
                    this.restartCourse();
                    break;
            }
        }
    }

    startCourse() {
        const introSection = document.getElementById('introduction');
        const moduleNav = document.getElementById('module-nav');
        
        if (introSection && moduleNav) {
            // Hide introduction
            introSection.classList.add('hidden');
            
            // Show module navigation
            moduleNav.classList.remove('hidden');
            moduleNav.classList.add('animate-fade-in');
            
            // Start with fundamentals module
            setTimeout(() => {
                this.showModule('fundamentals');
                this.startTimer();
            }, 300);
        }
    }

    showModule(moduleName) {
        // Hide all modules
        const modules = document.querySelectorAll('.course-module');
        modules.forEach(module => {
            module.classList.remove('active');
            setTimeout(() => {
                module.classList.add('hidden');
            }, 300);
        });

        // Update navigation
        this.updateModuleNavigation(moduleName);

        // Show target module
        setTimeout(() => {
            const targetModule = document.getElementById(moduleName);
            if (targetModule) {
                targetModule.classList.remove('hidden');
                setTimeout(() => {
                    targetModule.classList.add('active');
                    this.currentModule = moduleName;
                    this.updateProgress();
                    this.triggerModuleAnimations(moduleName);
                }, 50);
            }
        }, 300);
    }

    updateModuleNavigation(moduleName) {
        const navButtons = document.querySelectorAll('.module-nav-btn');
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-module') === moduleName) {
                btn.classList.add('active');
            }
        });
    }

    updateProgress() {
        const moduleOrder = ['fundamentals', 'commerce', 'payments', 'case-studies', 'exercises', 'future'];
        const currentIndex = moduleOrder.indexOf(this.currentModule);
        const progress = ((currentIndex + 1) / this.totalModules) * 100;
        
        const progressBar = document.getElementById('course-progress');
        const progressText = document.getElementById('progress-text');
        
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Module ${currentIndex + 1} of ${this.totalModules}`;
        }
    }

    startTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        this.startTime = Date.now();
        this.timer = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        this.remainingTime = Math.max(0, this.courseDuration - elapsed);
        
        const hours = Math.floor(this.remainingTime / 3600);
        const minutes = Math.floor((this.remainingTime % 3600) / 60);
        const seconds = this.remainingTime % 60;
        
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (this.remainingTime === 0) {
            this.completeCourse();
        }
    }

    triggerModuleAnimations(moduleName) {
        switch (moduleName) {
            case 'fundamentals':
                this.animateFundamentals();
                break;
            case 'commerce':
                this.animateCommerce();
                break;
            case 'payments':
                this.animatePayments();
                break;
            case 'case-studies':
                this.animateCaseStudies();
                break;
            case 'exercises':
                this.animateExercises();
                break;
            case 'future':
                this.animateFuture();
                break;
        }
    }

    animateFundamentals() {
        // Animate AI agent visualization
        const agentBrain = document.querySelector('.agent-brain');
        const connectionNodes = document.querySelectorAll('.connection-node');
        
        if (agentBrain) {
            agentBrain.style.animation = 'none';
            setTimeout(() => {
                agentBrain.style.animation = 'logoFloat 3s ease-in-out infinite';
            }, 100);
        }

        connectionNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('animate-bounce-in');
            }, index * 200);
        });

        // Animate timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-slide-in-left');
            }, index * 300);
        });
    }

    animateCommerce() {
        // Animate architecture layers
        const archLayers = document.querySelectorAll('.arch-layer');
        archLayers.forEach((layer, index) => {
            setTimeout(() => {
                layer.classList.add('animate-slide-in-right');
            }, index * 200);
        });

        // Initialize inventory chart
        this.initializeInventoryChart();

        // Animate feature boxes
        const featureBoxes = document.querySelectorAll('.feature-box');
        featureBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('animate-bounce-in');
            }, index * 150);
        });
    }

    animatePayments() {
        // Animate payment flow
        const flowNodes = document.querySelectorAll('.flow-node');
        flowNodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('animate-bounce-in');
            }, index * 200);
        });

        // Animate fraud detection demo
        const transactionItems = document.querySelectorAll('.transaction-item');
        transactionItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'transactionSlide 0.5s ease-out';
            }, index * 300);
        });

        // Animate metric bars
        setTimeout(() => {
            this.animateMetricBars();
        }, 1000);
    }

    animateCaseStudies() {
        // Animate implementation stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-bounce-in');
            }, index * 200);
        });

        // Animate AI systems list
        const systemItems = document.querySelectorAll('.system-item');
        systemItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-slide-in-left');
            }, index * 150);
        });
    }

    animateExercises() {
        // Animate instruction steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('animate-slide-in-left');
            }, index * 200);
        });
    }

    animateFuture() {
        // Animate future timeline
        const futureYears = document.querySelectorAll('.future-year');
        futureYears.forEach((year, index) => {
            setTimeout(() => {
                year.classList.add('animate-fade-in');
            }, index * 300);
        });

        // Animate tech cards
        const techCards = document.querySelectorAll('.tech-card');
        techCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-bounce-in');
            }, index * 200);
        });

        // Initialize impact chart
        this.initializeImpactChart();
    }

    animateMetricBars() {
        const barFills = document.querySelectorAll('.bar-fill');
        barFills.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    runAgentSimulation() {
        const agent = document.getElementById('demo-agent');
        const envElements = document.querySelectorAll('.env-element');
        const output = document.getElementById('shopping-output');

        if (!agent) return;

        // Reset agent position
        agent.style.transform = 'translate(-50%, -50%)';
        agent.style.transition = 'all 0.5s ease';

        const scenarios = [
            {
                element: '.customer',
                action: 'Analyzing customer behavior patterns...',
                result: 'Customer preference profile created'
            },
            {
                element: '.product', 
                action: 'Scanning product catalog and reviews...',
                result: 'Best product match identified'
            },
            {
                element: '.inventory',
                action: 'Checking inventory and logistics...',
                result: 'Optimal delivery route calculated'
            }
        ];

        let step = 0;
        const runStep = () => {
            if (step < scenarios.length) {
                const scenario = scenarios[step];
                const targetElement = document.querySelector(scenario.element);
                
                if (targetElement && output) {
                    // Move agent to target
                    const targetRect = targetElement.getBoundingClientRect();
                    const agentRect = agent.getBoundingClientRect();
                    const simArea = document.getElementById('agent-simulation');
                    const simRect = simArea.getBoundingClientRect();
                    
                    const deltaX = targetRect.left - simRect.left - simRect.width / 2;
                    const deltaY = targetRect.top - simRect.top - simRect.height / 2;
                    
                    agent.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                    
                    // Add action text
                    setTimeout(() => {
                        output.innerHTML += `<div class="sim-action">${scenario.action}</div>`;
                        output.scrollTop = output.scrollHeight;
                        
                        setTimeout(() => {
                            output.innerHTML += `<div class="sim-result">✓ ${scenario.result}</div>`;
                            output.scrollTop = output.scrollHeight;
                            step++;
                            setTimeout(runStep, 1500);
                        }, 1000);
                    }, 500);
                } else {
                    step++;
                    runStep();
                }
            } else {
                // Return agent to center
                setTimeout(() => {
                    agent.style.transform = 'translate(-50%, -50%)';
                    output.innerHTML += `<div class="sim-complete">🎉 Simulation Complete! AI Agent successfully completed autonomous commerce workflow.</div>`;
                    output.scrollTop = output.scrollHeight;
                }, 1000);
            }
        };

        if (output) {
            output.innerHTML = '<div class="sim-start">🚀 Starting AI Agent Simulation...</div>';
        }
        
        setTimeout(runStep, 1000);
    }

    runShoppingSimulation() {
        const scenario = document.getElementById('shopping-scenario');
        const output = document.getElementById('shopping-output');
        
        if (!scenario || !output) return;

        const scenarioValue = scenario.value;
        const simulations = {
            electronics: {
                steps: [
                    'Analyzing user requirements: Gaming laptop, budget $1500',
                    'Searching 847 products across 23 retailers...',
                    'Comparing specifications and reviews...',
                    'Found: ASUS ROG Strix G15 - 4.8/5 stars, $1399',
                    'Checking inventory: 3 units available',
                    'Validating warranty and return policy...',
                    'Recommendation ready: Save $101 vs competitors'
                ],
                result: '✅ Perfect match found! ASUS ROG Strix G15 recommended.'
            },
            fashion: {
                steps: [
                    'Analyzing style preferences from purchase history...',
                    'Seasonal trend analysis: Fall 2024 fashion...',
                    'Size and fit prediction based on previous orders...',
                    'Scanning 1,200+ fashion retailers...',
                    'Color matching with existing wardrobe...',
                    'Sustainable brand preference detected...',
                    'Price optimization across multiple stores...'
                ],
                result: '✅ 5 perfect outfits curated with 20% average savings!'
            },
            groceries: {
                steps: [
                    'Analyzing household consumption patterns...',
                    'Checking pantry inventory via smart sensors...',
                    'Nutritional goal alignment: Mediterranean diet...',
                    'Local store price comparison in progress...',
                    'Organic preference and allergen filtering...',
                    'Optimizing delivery routes and freshness...',
                    'Meal planning integration complete...'
                ],
                result: '✅ Smart grocery list created! $67 saved vs manual shopping.'
            }
        };

        const sim = simulations[scenarioValue];
        let stepIndex = 0;

        output.innerHTML = '<div class="sim-header">🤖 AI Shopping Agent Activated</div>';
        output.scrollTop = output.scrollHeight;

        const runStep = () => {
            if (stepIndex < sim.steps.length) {
                const step = sim.steps[stepIndex];
                output.innerHTML += `<div class="sim-step">${stepIndex + 1}. ${step}</div>`;
                output.scrollTop = output.scrollHeight;
                stepIndex++;
                setTimeout(runStep, 800);
            } else {
                setTimeout(() => {
                    output.innerHTML += `<div class="sim-final">${sim.result}</div>`;
                    output.scrollTop = output.scrollHeight;
                }, 500);
            }
        };

        setTimeout(runStep, 500);
    }

    interactWithEnvironment(element) {
        const type = element.getAttribute('data-type');
        const messages = {
            customer: 'Customer data analyzed: Shopping pattern, preferences, budget constraints identified.',
            product: 'Product catalog scanned: Features, reviews, pricing, availability checked.',
            inventory: 'Inventory status: Stock levels, delivery options, logistics optimized.'
        };

        // Create floating message
        const message = document.createElement('div');
        message.className = 'env-message';
        message.textContent = messages[type] || 'Environment interaction detected.';
        message.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(99, 102, 241, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 15px;
            font-size: 12px;
            white-space: nowrap;
            pointer-events: none;
            z-index: 100;
            animation: messageFloat 3s ease-out forwards;
        `;

        // Add animation keyframes if not exists
        if (!document.getElementById('env-message-styles')) {
            const style = document.createElement('style');
            style.id = 'env-message-styles';
            style.textContent = `
                @keyframes messageFloat {
                    0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
                    20% { opacity: 1; transform: translateX(-50%) translateY(-10px); }
                    80% { opacity: 1; transform: translateX(-50%) translateY(-20px); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
                }
            `;
            document.head.appendChild(style);
        }

        element.appendChild(message);
        
        // Animate element
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'envFloat 4s ease-in-out infinite';
        }, 100);

        // Remove message after animation
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 3000);
    }

    showCaseStudy(caseName) {
        // Hide all case studies
        const caseStudies = document.querySelectorAll('.case-study');
        caseStudies.forEach(study => {
            study.classList.remove('active');
            setTimeout(() => {
                study.classList.add('hidden');
            }, 300);
        });

        // Update navigation
        const navButtons = document.querySelectorAll('.case-study-btn');
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-case') === caseName) {
                btn.classList.add('active');
            }
        });

        // Show target case study
        setTimeout(() => {
            const targetCase = document.getElementById(`case-${caseName}`);
            if (targetCase) {
                targetCase.classList.remove('hidden');
                setTimeout(() => {
                    targetCase.classList.add('active');
                }, 50);
            }
        }, 300);
    }

    showExercise(exerciseName) {
        // Hide all exercises
        const exercises = document.querySelectorAll('.exercise');
        exercises.forEach(exercise => {
            exercise.classList.remove('active');
            setTimeout(() => {
                exercise.classList.add('hidden');
            }, 300);
        });

        // Update navigation
        const navButtons = document.querySelectorAll('.exercise-btn');
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-exercise') === exerciseName) {
                btn.classList.add('active');
            }
        });

        // Show target exercise
        setTimeout(() => {
            const targetExercise = document.getElementById(`exercise-${exerciseName}`);
            if (targetExercise) {
                targetExercise.classList.remove('hidden');
                setTimeout(() => {
                    targetExercise.classList.add('active');
                }, 50);
            }
        }, 300);
    }

    initializeChatbot() {
        const storeType = document.getElementById('store-type').value;
        const personality = document.getElementById('bot-personality').value;
        const chatMessages = document.getElementById('chat-messages');
        
        if (chatMessages) {
            const welcomeMessages = {
                electronics: 'Hi! I\'m your electronics specialist. Looking for the latest tech gadgets or need help choosing between products?',
                fashion: 'Welcome to your personal style assistant! Ready to find the perfect outfit or update your wardrobe?',
                books: 'Greetings, fellow book lover! I can help you discover your next great read based on your preferences.',
                home: 'Hello! I\'m here to help you create the perfect living space. What room are you looking to enhance?'
            };

            const personalityPrefixes = {
                helpful: 'I\'m here to provide detailed, professional assistance.',
                friendly: 'Hey there! I\'m excited to help you find exactly what you need! 😊',
                expert: 'As your technical specialist, I can provide in-depth product analysis and recommendations.'
            };

            const message = `${personalityPrefixes[personality]} ${welcomeMessages[storeType]}`;
            
            chatMessages.innerHTML = `
                <div class="message bot-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>${message}</p>
                    </div>
                </div>
            `;
        }
    }

    sendChatMessage() {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
        
        if (!chatInput || !chatMessages) return;

        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Add user message
        const userMessageEl = document.createElement('div');
        userMessageEl.className = 'message user-message';
        userMessageEl.innerHTML = `
            <div class="message-content">
                <p>${userMessage}</p>
            </div>
            <div class="message-avatar">👤</div>
        `;
        chatMessages.appendChild(userMessageEl);

        // Clear input
        chatInput.value = '';

        // Generate bot response
        setTimeout(() => {
            const botResponse = this.generateBotResponse(userMessage);
            const botMessageEl = document.createElement('div');
            botMessageEl.className = 'message bot-message';
            botMessageEl.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${botResponse}</p>
                </div>
            `;
            chatMessages.appendChild(botMessageEl);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('laptop') || lowerMessage.includes('gaming')) {
            return '🎮 For gaming laptops, I recommend the ASUS ROG series or MSI Gaming line. What\'s your budget range? Are you looking for 4K gaming or high refresh rates?';
        } else if (lowerMessage.includes('phone') || lowerMessage.includes('iphone') || lowerMessage.includes('samsung')) {
            return '📱 Great choice! The iPhone 15 Pro offers excellent cameras and performance, while Samsung Galaxy S24 has superior customization. What features matter most to you?';
        } else if (lowerMessage.includes('gift') || lowerMessage.includes('under')) {
            return '🎁 Perfect! I can suggest some amazing gifts under $100: wireless earbuds, smart home devices, or tech accessories. Who is the gift for?';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cheap') || lowerMessage.includes('budget')) {
            return '💰 I always find the best deals! I can compare prices across multiple retailers and find coupon codes. What product are you interested in?';
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
            return '🚚 I can check real-time delivery options! Most items offer same-day or next-day delivery in major cities. Where are you located?';
        } else if (lowerMessage.includes('compare') || lowerMessage.includes('vs')) {
            return '⚖️ I excel at product comparisons! I analyze specs, reviews, prices, and user satisfaction. Which products would you like me to compare?';
        } else if (lowerMessage.includes('review') || lowerMessage.includes('rating')) {
            return '⭐ I analyze thousands of reviews using sentiment analysis and can identify common pros/cons. Which product reviews interest you?';
        } else {
            const responses = [
                '🤔 That\'s interesting! Can you tell me more about what you\'re looking for? I have access to millions of products.',
                '💡 I\'d love to help with that! Let me search through our extensive catalog to find the perfect match.',
                '🔍 Great question! I can analyze multiple factors like price, quality, reviews, and availability to give you the best recommendations.',
                '✨ I\'m designed to understand complex requests! Feel free to be specific about your needs, budget, or preferences.'
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    askQuickQuestion(question) {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.value = question;
            this.sendChatMessage();
        }
    }

    initializeCharts() {
        // Will be called after modules are loaded
        setTimeout(() => {
            this.initializeInventoryChart();
            this.initializeImpactChart();
        }, 2000);
    }

    initializeInventoryChart() {
        const ctx = document.getElementById('inventoryChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'AI Optimization',
                    data: [65, 78, 85, 91, 94, 97],
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Traditional Method',
                    data: [45, 52, 48, 61, 58, 55],
                    borderColor: 'rgb(248, 113, 113)',
                    backgroundColor: 'rgba(248, 113, 113, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#e2e8f0'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#94a3b8'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 6,
                        hoverRadius: 8
                    }
                }
            }
        });
    }

    initializeImpactChart() {
        const ctx = document.getElementById('impactChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['AI Automation', 'Human Tasks', 'Hybrid Processes'],
                datasets: [{
                    data: [65, 15, 20],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(248, 113, 113, 0.8)',
                        'rgba(34, 197, 94, 0.8)'
                    ],
                    borderColor: [
                        'rgb(99, 102, 241)',
                        'rgb(248, 113, 113)',
                        'rgb(34, 197, 94)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e2e8f0',
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    setupKeyboardNavigation() {
        // Add keyboard navigation hints
        const navigationHint = document.createElement('div');
        navigationHint.className = 'keyboard-hint';
        navigationHint.innerHTML = `
            <div class="hint-content">
                <h4>Keyboard Shortcuts</h4>
                <div class="shortcuts">
                    <span><kbd>Ctrl</kbd> + <kbd>1-6</kbd> - Navigate modules</span>
                    <span><kbd>Ctrl</kbd> + <kbd>R</kbd> - Restart course</span>
                    <span><kbd>Enter</kbd> - Send chat message</span>
                </div>
            </div>
        `;
        navigationHint.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1rem;
            color: white;
            font-size: 0.8rem;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            max-width: 250px;
        `;

        // Add styles for kbd elements
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-hint kbd {
                background: rgba(255, 255, 255, 0.2);
                padding: 2px 6px;
                border-radius: 4px;
                font-family: monospace;
                font-size: 0.7rem;
            }
            .shortcuts {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                margin-top: 0.5rem;
            }
            .hint-content h4 {
                margin-bottom: 0.5rem;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(navigationHint);

        // Show hint on mouseover of navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                navigationHint.style.opacity = '1';
                navigationHint.style.transform = 'translateY(0)';
            }
        });

        document.addEventListener('keyup', () => {
            setTimeout(() => {
                navigationHint.style.opacity = '0';
                navigationHint.style.transform = 'translateY(20px)';
            }, 1000);
        });
    }

    initializeTooltips() {
        // Add tooltips to interactive elements
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.getAttribute('data-tooltip'));
            });

            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    }

    showTooltip(element, text) {
        // Remove existing tooltip
        this.hideTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            z-index: 10000;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(tooltip);

        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';

        // Add animation
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        setTimeout(() => {
            tooltip.style.transition = 'all 0.2s ease';
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
    }

    hideTooltip() {
        const existing = document.querySelector('.custom-tooltip');
        if (existing) {
            existing.remove();
        }
    }

    completeCourse() {
        clearInterval(this.timer);
        
        const elapsedTime = this.courseDuration - this.remainingTime;
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        
        const finalTimeElement = document.getElementById('final-time');
        if (finalTimeElement) {
            finalTimeElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        // Show completion animation
        this.showModule('future');
        
        setTimeout(() => {
            const completionCard = document.querySelector('.completion-card');
            if (completionCard) {
                completionCard.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }

    downloadCertificate() {
        // Create a simple certificate
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Background
        const gradient = ctx.createLinearGradient(0, 0, 800, 600);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);

        // Title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Completion', 400, 150);

        // Course name
        ctx.font = '32px Arial';
        ctx.fillText('AI Agent E-Commerce & Payment Systems', 400, 220);

        // Completion text
        ctx.font = '24px Arial';
        ctx.fillText('Successfully completed 3-hour comprehensive course', 400, 280);

        // Date
        ctx.font = '18px Arial';
        ctx.fillText(`Completed on ${new Date().toLocaleDateString()}`, 400, 350);

        // Create download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'AI-Commerce-Certificate.png';
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    restartCourse() {
        // Reset all state
        this.currentModule = 'introduction';
        this.moduleProgress = 0;
        this.remainingTime = this.courseDuration;
        
        if (this.timer) {
            clearInterval(this.timer);
        }

        // Reset UI
        const progressBar = document.getElementById('course-progress');
        const progressText = document.getElementById('progress-text');
        const timer = document.getElementById('timer');
        
        if (progressBar) progressBar.style.width = '0%';
        if (progressText) progressText.textContent = 'Module 1 of 6';
        if (timer) timer.textContent = '03:00:00';

        // Show introduction
        const modules = document.querySelectorAll('.course-module');
        modules.forEach(module => {
            module.classList.remove('active');
            module.classList.add('hidden');
        });

        const moduleNav = document.getElementById('module-nav');
        const introduction = document.getElementById('introduction');
        
        if (moduleNav) moduleNav.classList.add('hidden');
        if (introduction) {
            introduction.classList.remove('hidden');
            setTimeout(() => {
                introduction.classList.add('active');
            }, 100);
        }
    }

    runRecommendationTest() {
        const algorithm = document.getElementById('rec-algorithm').value;
        const priceWeight = document.getElementById('price-weight').value / 100;
        const ratingWeight = document.getElementById('rating-weight').value / 100;
        const similarityWeight = document.getElementById('similarity-weight').value / 100;
        const output = document.getElementById('recommendation-output');

        if (!output) return;

        // Simulate recommendation generation
        const products = [
            { name: 'Gaming Smartphone Pro', icon: '📱', category: 'Mobile', price: 899, rating: 4.8 },
            { name: 'Wireless Gaming Headset', icon: '🎧', category: 'Audio', price: 249, rating: 4.6 },
            { name: 'Mobile Game Controller', icon: '🕹️', category: 'Gaming', price: 89, rating: 4.3 },
            { name: 'Power Bank Ultra', icon: '🔋', category: 'Accessories', price: 69, rating: 4.5 },
            { name: 'Gaming Chair Pro', icon: '💺', category: 'Furniture', price: 399, rating: 4.7 }
        ];

        // Calculate scores based on weights
        const recommendations = products.map(product => {
            const priceScore = Math.max(0, 1 - (product.price / 1000)); // Normalize price
            const ratingScore = product.rating / 5;
            const similarityScore = Math.random() * 0.3 + 0.7; // Simulated similarity
            
            const totalScore = (priceScore * priceWeight + ratingScore * ratingWeight + similarityScore * similarityWeight) / 3;
            return { ...product, score: totalScore };
        }).sort((a, b) => b.score - a.score).slice(0, 3);

        // Update output
        output.innerHTML = recommendations.map((rec, index) => {
            const matchPercentage = Math.floor(rec.score * 100);
            const reasons = [
                `Matches ${algorithm === 'collaborative' ? 'similar user preferences' : 'your interests'}`,
                'High user rating and reviews',
                `Price within preferred range`,
                'Complementary to previous purchases'
            ];
            
            return `
                <div class="rec-item" style="animation: slideInLeft 0.5s ease-out ${index * 0.1}s both;">
                    <div class="rec-image">${rec.icon}</div>
                    <div class="rec-info">
                        <h6>${rec.name}</h6>
                        <p class="rec-score">Match: ${matchPercentage}%</p>
                        <p class="rec-reason">${reasons[index % reasons.length]}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Update metrics
        const precision = 85 + Math.random() * 15;
        const recall = 80 + Math.random() * 15;
        const f1Score = (2 * precision * recall) / (precision + recall);

        document.getElementById('precision-score').textContent = `${precision.toFixed(1)}%`;
        document.getElementById('recall-score').textContent = `${recall.toFixed(1)}%`;
        document.getElementById('f1-score').textContent = `${f1Score.toFixed(1)}%`;
    }

    runFraudDetection() {
        const amountThreshold = document.getElementById('amount-threshold').value;
        const velocitySensitivity = document.getElementById('velocity-sensitivity').value / 100;
        const locationRisk = document.getElementById('location-risk').value / 100;
        const deviceTrust = document.getElementById('device-trust').value / 100;
        const feed = document.getElementById('transaction-feed');

        if (!feed) return;

        // Clear existing transactions
        feed.innerHTML = '';

        // Generate sample transactions
        const transactions = [
            { amount: 47.99, merchant: 'Coffee Shop', location: 'Local', device: 'Known', velocity: 'Normal' },
            { amount: 1299.99, merchant: 'Electronics Store', location: 'Different City', device: 'New', velocity: 'High' },
            { amount: 23.50, merchant: 'Gas Station', location: 'Local', device: 'Known', velocity: 'Normal' },
            { amount: 2499.00, merchant: 'Unknown Vendor', location: 'Foreign', device: 'Suspicious', velocity: 'Very High' },
            { amount: 89.99, merchant: 'Online Store', location: 'Local', device: 'Known', velocity: 'Normal' },
            { amount: 156.78, merchant: 'Restaurant', location: 'Nearby City', device: 'Known', velocity: 'Medium' }
        ];

        let safeCount = 0, suspiciousCount = 0, blockedCount = 0;

        transactions.forEach((transaction, index) => {
            setTimeout(() => {
                // Calculate risk score
                let riskScore = 0;
                
                if (transaction.amount > amountThreshold) riskScore += 30;
                if (transaction.velocity !== 'Normal') riskScore += 25 * velocitySensitivity;
                if (transaction.location !== 'Local') riskScore += 20 * locationRisk;
                if (transaction.device !== 'Known') riskScore += 25 * (1 - deviceTrust);

                let riskLevel, riskClass, action;
                if (riskScore < 20) {
                    riskLevel = 'Low';
                    riskClass = 'safe';
                    action = 'Approved';
                    safeCount++;
                } else if (riskScore < 50) {
                    riskLevel = 'Medium';
                    riskClass = 'suspicious';
                    action = 'Review Required';
                    suspiciousCount++;
                } else {
                    riskLevel = 'High';
                    riskClass = 'blocked';
                    action = 'Blocked';
                    blockedCount++;
                }

                const transactionEl = document.createElement('div');
                transactionEl.className = `transaction-item ${riskClass}`;
                transactionEl.innerHTML = `
                    <div class="transaction-details">
                        <span class="amount">$${transaction.amount}</span>
                        <span class="merchant">${transaction.merchant}</span>
                        <span class="location">${transaction.location}</span>
                    </div>
                    <div class="risk-assessment">
                        <span class="risk-score">Risk: ${riskScore.toFixed(0)}%</span>
                        <span class="action">${action}</span>
                    </div>
                `;

                feed.appendChild(transactionEl);
                feed.scrollTop = feed.scrollHeight;

                // Update counters
                document.getElementById('safe-transactions').textContent = safeCount;
                document.getElementById('suspicious-transactions').textContent = suspiciousCount;
                document.getElementById('blocked-transactions').textContent = blockedCount;

            }, index * 800);
        });
    }

    runPriceOptimization() {
        const demandSensitivity = document.getElementById('demand-sensitivity').value / 100;
        const competitionWeight = document.getElementById('competition-weight').value / 100;
        const inventoryLevel = document.getElementById('inventory-level').value;
        const minMargin = document.getElementById('min-margin').value / 100;
        const output = document.getElementById('pricing-results');

        if (!output) return;

        // Sample products with current prices
        const products = [
            {
                name: 'Gaming Laptop Pro',
                category: 'Electronics • High Demand',
                currentPrice: 1299,
                competitorPrice: 1189,
                demandLevel: 'high',
                stock: 45
            },
            {
                name: 'Wireless Headphones',
                category: 'Audio • Medium Demand',
                currentPrice: 199,
                competitorPrice: 179,
                demandLevel: 'medium',
                stock: 128
            },
            {
                name: 'Smart Watch Sport',
                category: 'Wearables • Low Stock',
                currentPrice: 299,
                competitorPrice: 319,
                demandLevel: 'low',
                stock: 12
            }
        ];

        // Calculate optimized prices
        const optimizedProducts = products.map(product => {
            // Base optimization factors
            let priceFactor = 1;
            
            // Demand sensitivity
            if (product.demandLevel === 'high') {
                priceFactor -= 0.08 * demandSensitivity; // Lower price for high demand
            } else if (product.demandLevel === 'low' && product.stock < 20) {
                priceFactor += 0.1; // Raise price for low stock
            }
            
            // Competition weight
            const competitionDiff = (product.currentPrice - product.competitorPrice) / product.currentPrice;
            priceFactor -= competitionDiff * competitionWeight * 0.5;
            
            // Ensure minimum margin
            const costPrice = product.currentPrice * (1 - 0.4); // Assume 40% margin
            const minPrice = costPrice * (1 + minMargin);
            
            let optimizedPrice = Math.max(product.currentPrice * priceFactor, minPrice);
            optimizedPrice = Math.round(optimizedPrice);
            
            // Calculate impact
            const priceDiff = (optimizedPrice - product.currentPrice) / product.currentPrice;
            const volumeChange = -priceDiff * (demandSensitivity * 2 + 1); // Price elasticity
            const revenueChange = (1 + priceDiff) * (1 + volumeChange) - 1;
            
            return {
                ...product,
                optimizedPrice,
                volumeChange: volumeChange * 100,
                revenueChange: revenueChange * 100
            };
        });

        // Update display
        output.innerHTML = optimizedProducts.map((product, index) => `
            <div class="price-card" style="animation: slideInRight 0.5s ease-out ${index * 0.2}s both;">
                <div class="product-info">
                    <h6>${product.name}</h6>
                    <p class="product-category">${product.category}</p>
                </div>
                <div class="price-optimization">
                    <div class="price-before">
                        <span class="label">Current:</span>
                        <span class="price">$${product.currentPrice}</span>
                    </div>
                    <div class="price-arrow">→</div>
                    <div class="price-after">
                        <span class="label">Optimized:</span>
                        <span class="price optimized">$${product.optimizedPrice}</span>
                    </div>
                </div>
                <div class="optimization-impact">
                    <span class="impact-metric">${product.volumeChange >= 0 ? '+' : ''}${product.volumeChange.toFixed(0)}% Sales Volume</span>
                    <span class="impact-metric">${product.revenueChange >= 0 ? '+' : ''}${product.revenueChange.toFixed(0)}% Revenue</span>
                </div>
            </div>
        `).join('');

        // Calculate overall impact
        const avgRevenueChange = optimizedProducts.reduce((sum, p) => sum + p.revenueChange, 0) / optimizedProducts.length;
        const profitIncrease = avgRevenueChange * 1.4; // Amplify for profit
        const turnoverIncrease = Math.abs(optimizedProducts.reduce((sum, p) => sum + p.volumeChange, 0) / optimizedProducts.length);
        const satisfactionIncrease = Math.min(15, turnoverIncrease * 0.3);

        // Update summary
        setTimeout(() => {
            const summaryItems = document.querySelectorAll('.summary-value');
            if (summaryItems.length >= 4) {
                summaryItems[0].textContent = `+${avgRevenueChange.toFixed(1)}%`;
                summaryItems[1].textContent = `+${profitIncrease.toFixed(1)}%`;
                summaryItems[2].textContent = `+${turnoverIncrease.toFixed(1)}%`;
                summaryItems[3].textContent = `+${satisfactionIncrease.toFixed(1)}%`;
            }
        }, 1000);
    }
}

// Global functions for HTML onclick handlers
function startCourse() {
    window.aiPlatform.startCourse();
}

function showModule(moduleName) {
    window.aiPlatform.showModule(moduleName);
}

function showCaseStudy(caseName) {
    window.aiPlatform.showCaseStudy(caseName);
}

function showExercise(exerciseName) {
    window.aiPlatform.showExercise(exerciseName);
}

function runAgentSimulation() {
    window.aiPlatform.runAgentSimulation();
}

function runShoppingSimulation() {
    window.aiPlatform.runShoppingSimulation();
}

function initializeChatbot() {
    window.aiPlatform.initializeChatbot();
}

function sendChatMessage() {
    window.aiPlatform.sendChatMessage();
}

function askQuickQuestion(question) {
    window.aiPlatform.askQuickQuestion(question);
}

function downloadCertificate() {
    window.aiPlatform.downloadCertificate();
}

function restartCourse() {
    window.aiPlatform.restartCourse();
}

function runRecommendationTest() {
    window.aiPlatform.runRecommendationTest();
}

function runFraudDetection() {
    window.aiPlatform.runFraudDetection();
}

function runPriceOptimization() {
    window.aiPlatform.runPriceOptimization();
}

// Initialize the platform when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiPlatform = new AICommercePlatform();
    
    // Initialize slider value displays
    initializeSliders();
});

function initializeSliders() {
    // Price weight slider
    const priceWeight = document.getElementById('price-weight');
    const priceWeightValue = document.getElementById('price-weight-value');
    if (priceWeight && priceWeightValue) {
        priceWeight.addEventListener('input', (e) => {
            priceWeightValue.textContent = e.target.value + '%';
        });
    }

    // Rating weight slider
    const ratingWeight = document.getElementById('rating-weight');
    const ratingWeightValue = document.getElementById('rating-weight-value');
    if (ratingWeight && ratingWeightValue) {
        ratingWeight.addEventListener('input', (e) => {
            ratingWeightValue.textContent = e.target.value + '%';
        });
    }

    // Similarity weight slider
    const similarityWeight = document.getElementById('similarity-weight');
    const similarityWeightValue = document.getElementById('similarity-weight-value');
    if (similarityWeight && similarityWeightValue) {
        similarityWeight.addEventListener('input', (e) => {
            similarityWeightValue.textContent = e.target.value + '%';
        });
    }

    // Amount threshold slider
    const amountThreshold = document.getElementById('amount-threshold');
    const amountThresholdValue = document.getElementById('amount-threshold-value');
    if (amountThreshold && amountThresholdValue) {
        amountThreshold.addEventListener('input', (e) => {
            amountThresholdValue.textContent = e.target.value;
        });
    }

    // Velocity sensitivity slider
    const velocitySensitivity = document.getElementById('velocity-sensitivity');
    const velocitySensitivityValue = document.getElementById('velocity-sensitivity-value');
    if (velocitySensitivity && velocitySensitivityValue) {
        velocitySensitivity.addEventListener('input', (e) => {
            velocitySensitivityValue.textContent = e.target.value + '%';
        });
    }

    // Location risk slider
    const locationRisk = document.getElementById('location-risk');
    const locationRiskValue = document.getElementById('location-risk-value');
    if (locationRisk && locationRiskValue) {
        locationRisk.addEventListener('input', (e) => {
            locationRiskValue.textContent = e.target.value + '%';
        });
    }

    // Device trust slider
    const deviceTrust = document.getElementById('device-trust');
    const deviceTrustValue = document.getElementById('device-trust-value');
    if (deviceTrust && deviceTrustValue) {
        deviceTrust.addEventListener('input', (e) => {
            deviceTrustValue.textContent = e.target.value + '%';
        });
    }

    // Demand sensitivity slider
    const demandSensitivity = document.getElementById('demand-sensitivity');
    const demandSensitivityValue = document.getElementById('demand-sensitivity-value');
    if (demandSensitivity && demandSensitivityValue) {
        demandSensitivity.addEventListener('input', (e) => {
            demandSensitivityValue.textContent = e.target.value + '%';
        });
    }

    // Competition weight slider
    const competitionWeight = document.getElementById('competition-weight');
    const competitionWeightValue = document.getElementById('competition-weight-value');
    if (competitionWeight && competitionWeightValue) {
        competitionWeight.addEventListener('input', (e) => {
            competitionWeightValue.textContent = e.target.value + '%';
        });
    }

    // Inventory level slider
    const inventoryLevel = document.getElementById('inventory-level');
    const inventoryLevelValue = document.getElementById('inventory-level-value');
    if (inventoryLevel && inventoryLevelValue) {
        inventoryLevel.addEventListener('input', (e) => {
            inventoryLevelValue.textContent = e.target.value + ' units';
        });
    }

    // Minimum margin slider
    const minMargin = document.getElementById('min-margin');
    const minMarginValue = document.getElementById('min-margin-value');
    if (minMargin && minMarginValue) {
        minMargin.addEventListener('input', (e) => {
            minMarginValue.textContent = e.target.value + '%';
        });
    }
}

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add particle background animation
    createParticleBackground();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });
});

function createParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-background';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            animation: particleFloat ${15 + Math.random() * 20}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
        `;
        particleContainer.appendChild(particle);
    }

    // Add particle animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) translateX(0px);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
        .loading {
            position: relative;
            overflow: hidden;
        }
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: loading 1s ease-in-out;
        }
        @keyframes loading {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(particleContainer);
}