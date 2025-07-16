// --- CONFIG CONSTANTS ---
const FOCUS_TEST_DURATION_MS = 10000;
const AFTERIMAGE_STARE_SECONDS = 20;
const COLOR_TEST_ROUNDS = 6;
const CONTRAST_TEST_ROUNDS = 6;
const COLOR_TEST_LEVELS = ['#0000e0', 'Easy', '#0000f0', 'Medium', '#0000f8', 'Hard', '#33a0eb', 'Very Hard', '#3399e6', 'Very Hard', '#2a8cdd', 'Very Hard'];
const BASE_BLUE_COLOR = '#33a7f4';
const CONTRAST_TEST_OPACITIES = [0.15, 0.1, 0.08, 0.05, 0.03, 0.02];
const CONTRAST_CANVAS_BG = '#e0e0ff';
const CONTRAST_TEXT_COLOR_RGB = '51, 167, 244';
const TEST_ORDER = ['focus', 'afterimage', 'color', 'flicker', 'contrast', 'eyestrain'];

// --- TYPE DEFINITIONS ---
interface TestResults {
    focus: number | null;
    afterimage: number | null;
    color: number | null;
    flicker: number | null;
    contrast: number | null;
    eyestrain: number | null;
    dryness: number | null;
    blur: number | null;
    irritation: number | null;
}

// --- APP STATE ---
let currentView = 'home'; // 'home', 'tests', 'blog'
let selectedArticleIndex = -1; // -1 for list view, 0+ for detail view
let testResults: TestResults = {
    focus: null, afterimage: null, color: null, flicker: null, contrast: null,
    eyestrain: null, dryness: null, blur: null, irritation: null
};
let currentTestIndex = 0;
const appRoot = document.getElementById('app-root');

// --- DATA ---
const blogArticles = [
    {
        title: "What is Blue Light and How Does It Affect Your Eyes?",
        content: "In an age dominated by glowing screens, our eyes are constantly immersed in a sea of digital light. A significant component of this, known as blue light, is a powerful factor impacting our eye health. This high-energy visible (HEV) light is naturally present in sunlight but is also copiously emitted by our smartphones, tablets, computers, and modern LED lighting.\n\nWhat is Blue Light?: Visible light is made up of various colors, each with a different wavelength and energy level. Blue light has shorter wavelengths and higher energy. It's this high energy that allows it to penetrate deep into the eye, reaching the retina—the light-sensitive tissue at the back of the eye.\n\nThe Most Common Effect: Digital Eye Strain: The most immediate consequence of excessive blue light exposure is digital eye strain, or Computer Vision Syndrome (CVS). This is a cluster of eye and vision-related problems resulting from prolonged screen use. Symptoms include eye fatigue, dryness, blurry vision, and screen-related headaches. The high-energy nature of blue light can increase visual 'noise,' making it harder for our eyes to focus clearly.\n\nPotential Long-Term Risks: Beyond immediate discomfort, there is growing concern about the long-term effects of chronic blue light exposure. The retina, particularly the macula (responsible for sharp, detailed vision), is highly susceptible to light-induced damage. Research is actively exploring links between excessive blue light and an accelerated risk for conditions like Age-related Macular Degeneration (AMD) and cataracts due to oxidative stress and photochemical damage to retinal cells.\n\nWhy Modern Exposure is Different: While sunlight is our biggest source of blue light, modern device use is unique. We hold screens close to our eyes for many hours, often late into the night. This chronic, close-range, and poorly-timed exposure is a new phenomenon, and its cumulative effect over a lifetime is the primary concern for eye care professionals.\n\nTake the First Step to Protection: Understanding these risks is the first step toward proactive eye care. Simple changes in habits and your environment can make a significant difference. To understand your personal risk profile, you need data on how your eyes are performing.\n\nGet Your Personalized Insights with TestBlueLight.com: Don't let the invisible threat of blue light compromise your vision. Visit TestBlueLight.com and take our quick, insightful tests to assess your personal sensitivity and receive tailored recommendations to protect your eyes in our digital world."
    },
    {
        title: "How Blue Light Hijacks Your Sleep: A Deep Dive into the Circadian Rhythm",
        content: "For millennia, human sleep was governed by the sun. Today, our bedrooms are aglow with artificial light from screens, acting as a powerful sleep disruptor. Understanding how this works is key to reclaiming restorative rest.\n\nYour Internal Master Clock: The Circadian Rhythm: Deep within your brain is a master clock called the suprachiasmatic nucleus (SCN). It runs on a roughly 24-hour cycle, orchestrating everything from hormone release to body temperature and, most importantly, your sleep-wake cycle. The most powerful signal to set this clock is light.\n\nHow Light Controls Your Clock: Specialized cells in your eyes detect bright, blue-rich light. During the day, this light signals to the SCN that it's time to be awake, alert, and active. As darkness falls, the absence of this blue light stimulus triggers the SCN to signal the pineal gland, which then produces melatonin, the 'sleep hormone,' making you feel drowsy and preparing your body for rest.\n\nThe Problem with Modern Light: When we expose ourselves to blue light from screens in the evening, we send a confusing signal to our SCN. It misinterprets this artificial light as daylight, which directly suppresses or delays the release of melatonin. This disruption is the primary reason screens are considered 'sleep thieves.'\n\nConsequences of a Disrupted Rhythm: The immediate effect is difficulty falling asleep and reduced sleep quality. Over time, chronic circadian disruption can lead to a cascade of health issues, including:\n- Daytime fatigue and cognitive impairment ('brain fog').\n- Mood disturbances, including increased anxiety and stress.\n- Metabolic issues, contributing to weight gain and increased risk of Type 2 diabetes.\n- Weakened immune system and cardiovascular strain.\n\nStrategies for Harmonizing Your Rhythm:\n1. Establish a 'Digital Sunset': Power down all screens 1-2 hours before bed. This is the most crucial step.\n2. Optimize Device Settings: Use 'Night Mode' or 'Dark Mode' to warm the color temperature of your screens in the evening.\n3. Control Your Environment: Dim ambient lights and use warm-toned light bulbs (2700K-3000K) in the evening.\n4. Maximize Daytime Light: Get bright, natural light exposure, especially in the morning, to strengthen your circadian signal.\n\nUnlock Your Personal Data with TestBlueLight.com: Your response to blue light can vary. TestBlueLight.com empowers you to move beyond generic advice by assessing how your screen habits might be affecting your personal eye performance, a key indicator of digital strain. Take control of your sleep and harmonize your rhythm—visit TestBlueLight.com today."
    },
    {
        title: "Screen Headaches & Migraines: A Complete Guide to Causes and Relief",
        content: "Headaches after a long day of screen time have become a common complaint. The link between screens and head pain is complex, involving direct muscle strain, light sensitivity, and neurological triggers. Understanding the cause is key to finding relief.\n\nThe Direct Link: Digital Eye Strain Headaches: The most common screen-related headaches are caused by Computer Vision Syndrome (CVS). When your eyes are overworked, the strain can manifest as pain. This is due to:\n- Accommodative Strain: The muscles in your eyes are in a constant state of contraction to focus on a close-up screen. This sustained tension can lead to headaches felt in the forehead or temples.\n- Reduced Blinking: We blink up to 70% less when staring at screens, leading to dry, irritated eyes that have to work harder, contributing to strain.\n- Poor Ergonomics: Hunching over a laptop or phone creates neck and shoulder tension that often refers pain to the head.\n\nHow Blue Light Makes Headaches Worse: While not the sole cause, blue light is a significant exacerbating factor:\n- Increased Visual Fatigue: Blue light scatters more within the eye, creating 'visual noise' that makes it harder to focus. Your eye muscles work harder to compensate, leading to fatigue and pain.\n- Triggering Photophobia (Light Sensitivity): For many people, especially those prone to migraines, blue light is a potent trigger for light sensitivity. This can make screen use intensely uncomfortable or even painful.\n\nSpecial Considerations for Migraines: Migraines are a neurological condition, and for sufferers, blue light can be a direct trigger. The specific brain pathways involved in migraine photophobia are highly sensitive to blue light wavelengths. For this reason, many migraineurs find that light is their most bothersome symptom and a reliable trigger for attacks.\n\nComprehensive Relief Strategies:\n1. Optimize Ergonomics: Position your screen at arm's length and slightly below eye level. Maintain good posture.\n2. Follow the 20-20-20 Rule: Every 20 minutes, look at something 20 feet away for 20 seconds to relax your eye muscles.\n3. Manage Your Light: Use 'Night Mode' on devices and consider blue light filtering glasses, especially amber-tinted ones for evening use or specialized FL-41 tints if you have migraines.\n4. Address Dry Eye: Make a conscious effort to blink more often and use lubricating eye drops if needed.\n5. Get a Comprehensive Eye Exam: Uncorrected vision problems are a massive, often overlooked, cause of screen headaches. Rule them out with a professional.\n\nIdentify Your Triggers with TestBlueLight.com: Understanding how your eyes perform under digital strain is the first step to relief. Our app can assess your visual fatigue and sensitivity, providing personalized insights to help you manage and prevent screen-induced headaches. Stop guessing and start measuring at TestBlueLight.com."
    },
    {
        title: "Protecting Kids from Blue Light: A Parent's Guide to Safe Screen Time",
        content: "Today's children are digital natives, but their developing eyes and brains are uniquely vulnerable to the effects of blue light and excessive screen time. Protecting them is about safeguarding their long-term vision, sleep, and overall development.\n\nWhy Children Are More Vulnerable:\n- More Transparent Lenses: A child's eye lens is more transparent than an adult's, allowing more high-energy blue light to penetrate directly to the retina.\n- Larger Pupils: Children's pupils are often larger, allowing more light to enter the eye.\n- Proximity to Screens: Kids tend to hold devices much closer to their faces, intensifying the light exposure.\n\nKey Areas of Impact:\n1. The Myopia Epidemic: Rates of nearsightedness (myopia) have skyrocketed globally. While the exact cause is multifactorial, research strongly links it to increased 'near work' on screens and a lack of protective outdoor time. Bright, natural light is crucial for healthy eye development.\n\n2. Sleep Disruption: Children are highly sensitive to blue light's melatonin-suppressing effects. Poor sleep in children often manifests not as drowsiness, but as hyperactivity, irritability, and difficulty concentrating.\n\n3. Behavioral and Focus Issues (ADHD-like Symptoms): Chronic sleep debt from screen use can mimic or worsen symptoms of ADHD. This includes inattention, emotional dysregulation (tantrums), and poor impulse control. The constant, instant-gratification nature of digital media can also make it harder for developing brains to engage in less stimulating but necessary tasks like reading or homework.\n\nEssential Strategies for Parents:\n- Enforce a 'Digital Sunset': This is paramount. All screens off at least 1-2 hours before bed. Keep screens out of the bedroom.\n- Prioritize Outdoor Play: Aim for at least 1-2 hours of outdoor time daily. This is a powerful protective factor for eye health.\n- Model Healthy Habits: Be mindful of your own screen use. Children emulate what they see.\n- Teach Good Ergonomics: Encourage an arm's length distance from screens and regular visual breaks using the 20-20-20 rule.\n- Set Clear Boundaries: Establish age-appropriate screen time limits and create screen-free zones, like the dinner table.\n- Get Regular Eye Exams: Annual comprehensive eye exams are crucial for early detection of vision problems.\n\nUnderstand Your Family's Exposure with TestBlueLight.com: Our app can help you and your family understand the principles of digital eye strain. By taking the tests yourself, you can gain insights and data to facilitate conversations with your children and your eye care professional about healthy digital habits. Lead by example and visit TestBlueLight.com to learn more."
    },
    {
        title: "Digital Dry Eye: Why Your Eyes Hurt and How to Find Lasting Relief",
        content: "That gritty, burning, and irritated feeling in your eyes after using a computer is an increasingly common issue known as Digital Dry Eye. It's a primary component of digital eye strain and can severely impact your comfort and productivity. Understanding the cause is the key to relief.\n\nThe Blinking Problem: The main reason screens cause dry eyes is simple: you blink far less. When concentrating on a screen, your blink rate can decrease by up to 70%. Blinking is essential because it spreads a thin, protective layer of tears, called the tear film, across your eye's surface. This film lubricates, nourishes, and protects your eyes.\n\nWhen you don't blink enough:\n- Your tears evaporate more quickly, leaving the eye surface exposed.\n- The tear film becomes unstable, leading to blurry vision and discomfort.\n- The oil-producing glands in your eyelids (Meibomian glands) can become clogged, leading to a chronic condition called MGD.\n\nOther Contributing Factors: Your environment plays a huge role. Air conditioning, heating, and fans all increase tear evaporation. A screen positioned too high also forces your eyes to open wider, exacerbating the problem.\n\nCommon Symptoms of Digital Dry Eye:\n- A burning or stinging sensation.\n- A gritty or sandy feeling, as if something is in your eye.\n- Redness and irritation.\n- Blurry vision that temporarily clears with a blink.\n- Paradoxically, watery eyes (a reflex response to severe dryness).\n\nEffective Strategies for Relief:\n1. Conscious Blinking: Remind yourself to blink fully and frequently. Practice 'power blinks' by gently squeezing your eyelids shut for a second.\n2. The 20-20-20 Rule: Every 20 minutes, look 20 feet away for 20 seconds. This gives your eyes a break and a chance to blink naturally.\n3. Optimize Ergonomics: Position your monitor at arm's length and slightly below eye level to reduce eye exposure.\n4. Use Lubricating Eye Drops: Over-the-counter 'artificial tears' can provide immediate relief. Use them proactively, before you feel discomfort.\n5. Warm Compresses: A warm compress on the eyelids for 5-10 minutes can help unclog oil glands and improve tear quality.\n6. Stay Hydrated: Drink plenty of water throughout the day.\n\nGet Your Personalized Assessment with TestBlueLight.com: While we don't measure tear volume, our app's visual fatigue and comfort tests can help you correlate your screen habits with your dry eye symptoms. Gain valuable insights and start your journey to lasting relief at TestBlueLight.com."
    },
    {
        title: "Blue Light Glasses: Do They Really Work? A Scientific Review",
        content: "Blue light glasses are everywhere, promising to reduce eye strain and improve sleep. But amidst the marketing hype, what does the science actually say? Here's a clear-eyed look at whether they're a wise investment for your eye health.\n\nHow They Work: Blue light glasses have lenses with special filters that absorb or reflect a portion of high-energy visible (HEV) blue light. The effectiveness varies greatly:\n- Clear Lenses: Block a small percentage (5-20%) of blue light. Marketed for general daytime use to reduce glare and strain.\n- Yellow/Amber Lenses: Offer moderate to significant filtration (30-70%). They will noticeably alter color perception.\n- Orange/Red Lenses: Provide the highest level of blockage (80-99%). They are most effective for sleep but significantly alter color.\n\nThe Claims vs. The Science:\n\nClaim 1: They Reduce Digital Eye Strain. (Evidence: Mixed)\nMany users report feeling more comfortable, which may be due to reduced glare and improved contrast. However, much of eye strain is caused by other factors like reduced blinking, poor ergonomics, and uncorrected vision problems. A 2023 Cochrane Review of multiple studies concluded there is currently no high-quality evidence that blue-light filtering lenses have a significant impact on digital eye strain. They may offer some comfort, but they are not a cure-all.\n\nClaim 2: They Improve Sleep Quality. (Evidence: Strong, but only for tinted lenses)\nThis is where the science is most robust. Numerous studies show that blue light in the evening suppresses the sleep hormone melatonin. By wearing amber or orange-tinted lenses that block a significant percentage of blue light, you can prevent this suppression, leading to better sleep onset and quality. Clear lenses offer little to no benefit for sleep.\n\nClaim 3: They Protect Against Long-Term Retinal Damage. (Evidence: Lacking)\nThis is the most controversial claim. While intense blue light can cause damage in lab settings, the amount emitted from typical screens is far less than what you get from sunlight. Leading ophthalmology organizations state there is currently no scientific evidence that blue light from screens causes retinal damage or that these glasses prevent it.\n\nWho Might Benefit Most?\n- Nighttime Screen Users: If you use screens in the 1-2 hours before bed, amber-tinted glasses are a scientifically-backed tool to protect your sleep.\n- Individuals with High Sensitivity: If you find screens uncomfortably bright or glaring, the filtering effect might provide some relief.\n\nConclusion: For sleep, tinted lenses work. For eye strain, they might offer some comfort, but they are not a substitute for good habits like taking breaks and proper ergonomics. Don't rely on them to prevent eye disease.\n\nFind Out if You Need Them with TestBlueLight.com: Our tests can help you assess your own visual fatigue and sensitivity. This personalized data can help you decide if investing in blue light glasses is the right move for you. Get the facts at TestBlueLight.com."
    },
    {
        title: "Eye-Friendly Tech: A Guide to Smarter Screens & Device Settings",
        content: "Your devices have powerful, often underutilized, features designed to improve eye comfort. Before investing in external products, mastering your device settings should be your first line of defense against digital eye strain.\n\n1. Activate 'Night Mode' (or 'Night Shift'/'Eye Comfort Shield'): This is the most critical setting. It shifts your screen's color temperature from cool, blue-rich tones to warmer, yellowish hues in the evening. This significantly reduces the blue light that disrupts melatonin and sleep. Set it to activate automatically from sunset to sunrise.\n\n2. Embrace 'Dark Mode': This inverts your device's color scheme to light text on a dark background. While it doesn't filter blue light like Night Mode, it drastically reduces the overall brightness (luminance) emitted by your screen. In low-light environments, this cuts down on glare and can make viewing much more comfortable.\n\n3. Manually Control Brightness: 'Auto-brightness' can be unreliable. A screen that's too bright in a dark room is a major source of strain. A good rule of thumb: your screen should not look like a light source. Adjust its brightness to blend in with the lighting of your environment.\n\n4. Increase Font Size and Contrast: Squinting to read small text is a direct cause of eye fatigue. Don't be afraid to increase the default font size on your phone or use the zoom function in your browser. Ensure you're using high-contrast modes for maximum text legibility.\n\nWhen Buying New Tech, Look For:\n- 'Flicker-Free' Technology: Some screens use a rapid on-off pulsing (PWM) to control brightness, which can cause subliminal eye strain and headaches in sensitive individuals. Monitors certified as 'flicker-free' use a different method (DC dimming) that is more comfortable for long-term use.\n- Matte vs. Glossy Screens: Matte screens have an anti-glare coating that diffuses reflections from windows and overhead lights. This is generally much better for eye comfort than a glossy, reflective screen.\n- OLED Displays: On an OLED screen, black pixels are completely turned off, not just displaying black. This means using dark mode on an OLED device results in significantly less light emission, which can be very comfortable.\n\nOptimize Your Setup with TestBlueLight.com: How effective are your current settings? Our app helps you measure your eye performance and visual fatigue, giving you the data to see if these technological tweaks are making a real difference. Optimize your digital world at TestBlueLight.com."
    },
    {
        title: "7 Actionable Strategies to Immediately Reduce Blue Light Exposure",
        content: "Managing blue light exposure is crucial for your eyes and sleep. The good news is that the most effective strategies are simple, free, and can be implemented right away.\n\n1. Embrace the 20-20-20 Rule Religiously: This is the cornerstone of healthy screen habits. Every 20 minutes, look at something 20 feet away for at least 20 seconds. This relaxes your eye's focusing muscles and helps you blink, preventing dryness and strain.\n\n2. Optimize Your Device Settings: Enable 'Night Mode' ('Night Shift') on all devices to automatically warm the screen color in the evening. Use 'Dark Mode' to reduce overall screen brightness and glare, especially in low-light environments.\n\n3. Create a 'Digital Sunset': This is the most powerful strategy for protecting sleep. Power down all blue-light-emitting devices (phones, tablets, laptops, TVs) at least 1-2 hours before your intended bedtime. This allows your body to produce melatonin naturally.\n\n4. Adjust Screen Brightness to Match Your Environment: A screen that's much brighter than your surroundings is a major source of eye strain. Manually adjust brightness throughout the day so your screen blends in with the ambient light.\n\n5. Optimize Your Home and Office Lighting: It's not just screens. Replace cool-white LED bulbs (4000K-6500K) with 'warm white' or 'soft white' LEDs (2700K-3000K), especially in bedrooms and living areas. Use dimmers to reduce light intensity in the evening.\n\n6. Maximize Natural Light Exposure During the Day: Get outside for at least 15-30 minutes of natural light, especially in the morning. This powerfully reinforces your body's internal clock (circadian rhythm), making it more resilient to artificial light at night.\n\n7. Consider Quality Blue Light Filtering Eyewear: While not a replacement for good habits, amber-tinted glasses can be an effective tool if you must use screens in the evening, as they block the specific wavelengths that most disrupt sleep.\n\nPersonalize Your Strategy with TestBlueLight.com: While these strategies are excellent, TestBlueLight.com can provide the personalized data to see how your digital habits are truly affecting your eyes. Get the insights you need to make the most impactful changes by visiting TestBlueLight.com today."
    },
    {
        title: "Beyond Screens: 5 Hidden Sources of Blue Light in Your Environment",
        content: "Focusing only on screens means we overlook a vast array of hidden blue light sources that contribute to our total daily exposure, potentially impacting our eye health and sleep.\n\n1. Modern LED Lighting: The widespread adoption of energy-efficient LED lighting has changed our indoor environments. Many common 'Cool White' or 'Daylight' LED bulbs (4000K-6500K) emit a significantly higher proportion of blue light compared to older incandescent bulbs. This is also true for the fluorescent lights common in offices and schools.\n\n2. Smart Home Devices: The 'smart' revolution brought more glowing interfaces into our lives. Smart speakers with displays, digital thermostats, smart refrigerators, and even digital alarm clocks all emit blue light, contributing to ambient light pollution in your home, especially at night.\n\n3. Vehicle Dashboards: Modern cars feature sophisticated digital dashboards, large infotainment systems, and GPS screens. These bright LED displays can be a significant source of blue light exposure during long commutes, especially at night.\n\n4. Small Indicator Lights: Look around your room at night. The tiny but bright blue or white LED indicator lights on your TV, computer monitor, power strips, and charging devices can be surprisingly disruptive to a dark sleep environment.\n\n5. Public and Commercial Displays: We are constantly bombarded by blue light from digital billboards, self-service kiosks at stores, ATMs, and screens at gas pumps. While individual encounters are brief, the cumulative effect adds to your daily blue light load.\n\nStrategies for Mitigation:\n- Choose 'Warm White' LED bulbs (2700K-3000K) for your home, especially in bedrooms.\n- Use dimmers to lower light intensity in the evenings.\n- Cover or dim the indicator lights on electronics in your bedroom.\n- Explore the display settings in your car to reduce brightness at night.\n\nSee the Bigger Picture with TestBlueLight.com: Understanding your total light environment is key. While our app focuses on your direct device usage, the insights gained can empower you to make smarter choices about all the light sources in your life. Start your journey to holistic eye wellness at TestBlueLight.com."
    },
    {
        title: "The Role of Nutrition: Key Nutrients to Protect Your Eyes from Digital Strain",
        content: "While screen filters and good habits are important, a crucial and often overlooked defense against digital eye strain is nutrition. Fueling your eyes from the inside out can build resilience against environmental stressors like blue light.\n\nThe Eye's Natural Blue Light Filter: Macular Pigment: At the center of your retina lies the macula, which contains a protective layer of pigment made from two carotenoids: lutein and zeaxanthin. This macular pigment acts like internal sunglasses, absorbing and filtering harmful high-energy blue light before it can reach your sensitive photoreceptor cells. Since your body cannot produce these compounds, you must get them from your diet.\n\nKey Nutrients for Eye Health:\n\n1. Lutein and Zeaxanthin:\n- Function: Filter blue light and act as powerful antioxidants.\n- Food Sources: Abundant in dark leafy greens like kale, spinach, and collard greens, as well as corn, peas, and egg yolks.\n\n2. Omega-3 Fatty Acids (EPA and DHA):\n- Function: A crucial structural component of retinal cells with potent anti-inflammatory properties, which can be highly beneficial for managing dry eye syndrome.\n- Food Sources: Fatty fish (salmon, mackerel, sardines), flaxseeds, chia seeds, and walnuts.\n\n3. Vitamin C:\n- Function: A powerful antioxidant that protects eye cells from oxidative damage.\n- Food Sources: Citrus fruits, bell peppers, strawberries, and broccoli.\n\n4. Vitamin E:\n- Function: Works with Vitamin C to protect cells from damage.\n- Food Sources: Nuts (almonds), seeds (sunflower seeds), and vegetable oils.\n\n5. Zinc:\n- Function: A vital mineral that helps transport Vitamin A to the retina to produce melanin, another protective pigment in the eye.\n- Food Sources: Oysters, red meat, poultry, and beans.\n\nBuilding an Eye-Healthy Diet: Focus on a holistic approach. A diet rich in a variety of colorful fruits, vegetables, and healthy fats provides a wide range of protective compounds. Staying well-hydrated is also essential for tear production and preventing dry eyes.\n\nEmpower Your Health with TestBlueLight.com: Our app helps you understand the impact of your screen habits, which can motivate you to support your eyes through lifestyle changes, including nutrition. Correlate your test results with your dietary habits to build a comprehensive strategy for protecting your vision. Learn more at TestBlueLight.com."
    }
];

// --- UTILITY FUNCTIONS ---
function clearElement(element: HTMLElement | null) {
    if (element) element.innerHTML = '';
}

function createElement<K extends keyof HTMLElementTagNameMap>(tag: K, properties: Record<string, any> = {}): HTMLElementTagNameMap[K] {
    const element = document.createElement(tag);
    Object.entries(properties).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.substring(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });
    return element;
}

// --- RENDER FUNCTIONS ---

function renderHeader() {
    const header = createElement('header', { className: 'app-header' });
    const headerContent = createElement('div', { className: 'container header-content' });
    
    const logo = createElement('div', { className: 'logo' });
    logo.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg><span class="logo-text">TestBlueLight.com</span>`;
    logo.onclick = () => {
        currentView = 'home';
        renderApp();
    };

    const nav = createElement('nav');
    const blogButton = createElement('button', {
        className: 'nav-button',
        textContent: 'Read Articles',
        onclick: () => {
            currentView = 'blog';
            selectedArticleIndex = -1;
            renderApp();
        }
    });
    
    nav.appendChild(blogButton);
    headerContent.appendChild(logo);
    headerContent.appendChild(nav);
    header.appendChild(headerContent);
    return header;
}

function renderHero(startTestCallback: () => void) {
    const heroSection = createElement('div', { className: 'hero-section' });
    heroSection.appendChild(createElement('div', { className: 'hero-overlay' }));
    const heroContent = createElement('div', { className: 'hero-content' });
    heroContent.appendChild(createElement('h1', { className: 'hero-title', textContent: 'Is Your Screen Hurting Your Eyes?' }));
    heroContent.appendChild(createElement('p', { className: 'hero-subtitle', textContent: 'In just a few minutes, our interactive tests assess your sensitivity to blue light and digital eye strain. Get personalized insights to protect your vision and improve your sleep.' }));
    heroContent.appendChild(createElement('button', {
        className: 'primary-button',
        textContent: 'Start The Test',
        onclick: startTestCallback,
        style: 'font-size: 1.125rem; padding: 0.75rem 2rem;'
    }));
    heroSection.appendChild(heroContent);
    return heroSection;
}

function renderFooter() {
    const footer = createElement('footer');
    footer.innerHTML = `<p>© ${new Date().getFullYear()} TestBlueLight.com. All rights reserved.</p><p style="margin-top: 0.25rem;">This test is for informational purposes and is not a substitute for professional medical advice.</p>`;
    return footer;
}

function renderAdPlaceholder() {
    return createElement('div', { className: 'ad-placeholder', innerHTML: '<p>Advertisement</p>' });
}

// --- BLOG RENDERING ---

function formatArticleContent(content: string): string {
    return content.split('\n\n').map(paragraph => {
        const trimmed = paragraph.trim();
        if (trimmed.length < 80 && trimmed.endsWith(':')) {
            return `<h3>${trimmed}</h3>`;
        }
        return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    }).join('');
}


function renderBlogList(container: HTMLElement) {
    const blogSection = createElement('section', { className: 'blog-section' });
    blogSection.appendChild(createElement('h1', { className: 'page-title', textContent: 'Digital Wellness Articles' }));
    
    const list = createElement('ul', { className: 'blog-list' });
    blogArticles.forEach((article, index) => {
        const listItem = createElement('li', { className: 'blog-list-item' });
        listItem.appendChild(createElement('h3', { textContent: article.title }));
        listItem.onclick = () => {
            selectedArticleIndex = index;
            renderApp();
        };
        list.appendChild(listItem);
    });

    blogSection.appendChild(list);
    container.appendChild(blogSection);
}

function renderArticleDetail(container: HTMLElement, index: number) {
    const article = blogArticles[index];
    const articleSection = createElement('section', { className: 'blog-section' });
    
    const backButton = createElement('button', {
        className: 'back-button',
        textContent: '← Back to All Articles',
        onclick: () => {
            selectedArticleIndex = -1;
            renderApp();
        }
    });
    
    const articleView = createElement('div', { className: 'blog-article-view' });
    const title = createElement('h2', { className: 'blog-article-title', textContent: article.title });
    const content = createElement('div', { className: 'blog-article-content', innerHTML: formatArticleContent(article.content) });

    articleView.appendChild(title);
    articleView.appendChild(content);
    
    articleSection.appendChild(backButton);
    articleSection.appendChild(articleView);
    container.appendChild(articleSection);
}

// --- TEST RENDERING ---

function renderTestCard(title: string, description: string, renderContentFn: (el: HTMLElement) => void | string, id: string, isCompleted: boolean, isActive: boolean) {
    const card = createElement('section', { id, className: `test-card ${isActive ? 'active' : 'inactive'} ${isCompleted ? 'completed' : ''}` });
    const header = createElement('div', { className: 'test-card-header' });
    header.appendChild(createElement('h2', { className: 'test-card-title', textContent: title }));
    if (isCompleted) {
        header.appendChild(createElement('span', { className: 'test-completed-badge', textContent: 'Completed' }));
    }
    card.appendChild(header);
    card.appendChild(createElement('p', { className: 'test-card-description', textContent: description }));
    const contentArea = createElement('div', { className: 'test-content' });
    if (typeof renderContentFn === 'function') {
        renderContentFn(contentArea);
    } else {
        contentArea.innerHTML = renderContentFn;
    }
    card.appendChild(contentArea);
    return card;
}

function completeTest(testName: keyof TestResults, result: number | null) {
    if (result === null || isNaN(result)) {
        (testResults as any)[testName] = null;
    } else {
        (testResults as any)[testName] = result;
    }
    const testIndex = TEST_ORDER.indexOf(testName);
    currentTestIndex = (testIndex === TEST_ORDER.length - 1) ? -1 : (testIndex >= 0 ? testIndex + 1 : -1);
    renderApp();
}

// --- INDIVIDUAL TEST RENDERERS ---

function renderFocusTest(parent: HTMLElement, onComplete: (testName: 'focus', result: number) => void) {
    let isTestRunning = false;
    let hits = 0;
    let clicks = 0;
    let timeRemaining = FOCUS_TEST_DURATION_MS / 1000;
    let dotX = 50, dotY = 50;
    let countdownInterval: number, dotMoveInterval: number;
    let finalScore: number | null = null;

    const testArea = createElement('div', { className: 'focus-test-area' });
    const dot = createElement('div', { className: 'focus-dot', style: `left:${dotX}px; top:${dotY}px; display:none;` });
    const placeholder = createElement('div', { className: 'focus-area-placeholder', textContent: 'Click "Start Test"' });
    testArea.appendChild(dot);
    testArea.appendChild(placeholder);

    const resultText = createElement('p', { className: 'test-result-text', textContent: 'Result: Not tested' });
    const startButton = createElement('button', { className: 'primary-button', textContent: 'Start Test' });

    function moveDot() {
        if (!testArea || !dot) return;
        const areaWidth = testArea.offsetWidth;
        const areaHeight = testArea.offsetHeight;
        const dotSize = dot.offsetWidth;
        dotX = Math.random() * (areaWidth - dotSize);
        dotY = Math.random() * (areaHeight - dotSize);
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
    }

    function endTest() {
        clearInterval(countdownInterval);
        clearInterval(dotMoveInterval);
        isTestRunning = false;
        dot.style.display = 'none';
        startButton.textContent = 'Test Done';
        startButton.disabled = true;
        finalScore = clicks > 0 ? (hits / clicks) * 100 : 0;
        resultText.innerHTML = `<span class="font-semibold">Result: ${finalScore.toFixed(1)}%</span>`;
        if (typeof onComplete === 'function') onComplete('focus', finalScore);
    }

    startButton.onclick = () => {
        if (isTestRunning || testResults.focus) return;
        isTestRunning = true;
        hits = 0; clicks = 0;
        timeRemaining = FOCUS_TEST_DURATION_MS / 1000;
        placeholder.style.display = 'none';
        dot.style.display = 'block';
        startButton.disabled = true;
        startButton.textContent = `Time: ${timeRemaining}s`;
        moveDot();
        countdownInterval = setInterval(() => {
            timeRemaining--;
            startButton.textContent = `Time: ${timeRemaining}s`;
            if (timeRemaining <= 0) endTest();
        }, 1000);
        dotMoveInterval = setInterval(moveDot, 1000);
    };

    dot.onclick = (e) => {
        if (!isTestRunning) return;
        e.stopPropagation();
        hits++;
        clicks++;
        resultText.textContent = `Hits: ${hits} / Clicks: ${clicks}`;
    };

    testArea.onclick = () => {
        if (!isTestRunning) return;
        clicks++;
        resultText.textContent = `Hits: ${hits} / Clicks: ${clicks}`;
    };

    if (testResults.focus !== null) {
        startButton.textContent = 'Test Done';
        startButton.disabled = true;
        placeholder.style.display = 'none';
        dot.style.display = 'none';
        resultText.innerHTML = `<span class="font-semibold">Result: ${testResults.focus.toFixed(1)}%</span>`;
    }

    parent.appendChild(testArea);
    parent.appendChild(startButton);
    parent.appendChild(resultText);
}

function renderAfterimageTest(parent: HTMLElement, onComplete: (testName: 'afterimage', result: number) => void) {
    let timeLeft = AFTERIMAGE_STARE_SECONDS;
    let afterimageTime = 0;
    let state = 'idle'; // idle, staring, watching, recorded
    let stareInterval: number, watchInterval: number | null;
    let recordedTime: number | null = null;

    const displayArea = createElement('div', { className: 'afterimage-display-area' });
    const blueBox = createElement('div', { className: 'afterimage-blue-box', style: 'display:none;' });
    const timerText = createElement('span', { textContent: String(timeLeft) });
    blueBox.appendChild(timerText);

    const whiteArea = createElement('div', { className: 'afterimage-white-area', style: 'display:none;' });
    const whiteAreaText = createElement('p', { textContent: 'Look here. Afterimage duration:' });
    const afterimageTimerText = createElement('span', { textContent: '0s' });
    whiteArea.appendChild(whiteAreaText);
    whiteArea.appendChild(afterimageTimerText);

    const placeholder = createElement('div', { className: 'afterimage-placeholder', textContent: 'Ready for Afterimage Test' });
    displayArea.appendChild(blueBox);
    displayArea.appendChild(whiteArea);
    displayArea.appendChild(placeholder);

    const startStareButton = createElement('button', { className: 'primary-button', textContent: 'Start Staring' });
    const stopTimerButton = createElement('button', { className: 'secondary-button', textContent: 'Stop Afterimage Timer (0s)', style: 'display:none;' });

    const inputGroup = createElement('div', { className: 'afterimage-input-group', style: 'display:none;' });
    const timeInput = createElement('input', { type: 'number', min: '0', placeholder: 'Secs' });
    const recordButton = createElement('button', { className: 'confirm-button', textContent: 'Record Time' });
    inputGroup.appendChild(timeInput);
    inputGroup.appendChild(recordButton);

    const resultText = createElement('p', { className: 'test-result-text', textContent: 'Result: Not tested' });

    function updateUI() {
        blueBox.style.display = state === 'staring' ? 'flex' : 'none';
        whiteArea.style.display = state === 'watching' ? 'flex' : 'none';
        placeholder.style.display = (state === 'idle' || state === 'recorded') && testResults.afterimage === null ? 'flex' : 'none';
        startStareButton.style.display = state === 'idle' ? 'inline-block' : 'none';
        stopTimerButton.style.display = state === 'watching' ? 'inline-block' : 'none';
        inputGroup.style.display = (state === 'watching' || recordedTime !== null) && state !== 'recorded' && testResults.afterimage === null ? 'flex' : 'none';

        if (state === 'watching') {
            stopTimerButton.textContent = `Stop Afterimage Timer (${afterimageTime}s)`;
        }
    }

    startStareButton.onclick = () => {
        if (state !== 'idle' || testResults.afterimage !== null) return;
        state = 'staring';
        timeLeft = AFTERIMAGE_STARE_SECONDS;
        timerText.textContent = String(timeLeft);
        updateUI();
        stareInterval = setInterval(() => {
            timeLeft--;
            timerText.textContent = String(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(stareInterval);
                state = 'watching';
                afterimageTime = 0;
                afterimageTimerText.textContent = '0s';
                updateUI();
                watchInterval = setInterval(() => {
                    afterimageTime++;
                    afterimageTimerText.textContent = `${afterimageTime}s`;
                    stopTimerButton.textContent = `Stop Afterimage Timer (${afterimageTime}s)`;
                }, 1000);
            }
        }, 1000);
    };

    stopTimerButton.onclick = () => {
        if (state !== 'watching' || !watchInterval) return;
        clearInterval(watchInterval);
        watchInterval = null;
        recordedTime = afterimageTime;
        timeInput.value = String(recordedTime);
        updateUI();
    };

    recordButton.onclick = () => {
        const finalTime = recordedTime !== null ? recordedTime : (state === 'watching' ? afterimageTime : 0);
        if (watchInterval) clearInterval(watchInterval);
        state = 'recorded';
        updateUI();
        resultText.innerHTML = `<span class="font-semibold">Result: ${finalTime} seconds</span>`;
        if (typeof onComplete === 'function') onComplete('afterimage', finalTime);
    };

    timeInput.onchange = (e) => {
        const val = parseInt((e.target as HTMLInputElement).value);
        if (!isNaN(val) && val >= 0) {
            recordedTime = val;
        } else if ((e.target as HTMLInputElement).value === '') {
            recordedTime = null;
        }
    };

    if (testResults.afterimage !== null) {
        startStareButton.disabled = true;
        stopTimerButton.disabled = true;
        recordButton.disabled = true;
        timeInput.disabled = true;
        placeholder.style.display = 'none';
        blueBox.style.display = 'none';
        whiteArea.style.display = 'none';
        inputGroup.style.display = 'none';
        const completedPlaceholder = Array.from(displayArea.children).find(el => el.classList.contains('afterimage-placeholder-completed')) as HTMLElement | undefined;
        if (!completedPlaceholder) {
            const newPlaceholder = createElement('div', { className: 'afterimage-placeholder afterimage-placeholder-completed', style: 'color:#6ee7b7;', textContent: 'Test Completed' });
            displayArea.appendChild(newPlaceholder);
        } else {
            completedPlaceholder.style.display = 'flex';
        }
        resultText.innerHTML = `<span class="font-semibold">Result: ${testResults.afterimage} seconds</span>`;
    }
    
    updateUI();
    parent.appendChild(displayArea);
    parent.appendChild(startStareButton);
    parent.appendChild(stopTimerButton);
    parent.appendChild(inputGroup);
    parent.appendChild(resultText);
}

function renderColorTest(parent: HTMLElement, onComplete: (testName: 'color', result: number) => void) {
    let currentRound = 0;
    let score = 0;
    let differentColor: string;
    let testInProgress = false;

    const feedbackText = createElement('p', { className: 'color-feedback-text test-result-text' });
    const squaresContainer = createElement('div', { className: 'color-squares-container' });
    const progressText = createElement('p', { className: 'test-result-text', style: 'font-size:0.875rem; color:#94a3b8;' });
    const startButton = createElement('button', { className: 'primary-button', textContent: 'Start Color Test' });

    function startNextRound() {
        if (currentRound >= COLOR_TEST_ROUNDS) return;
        testInProgress = true;
        differentColor = COLOR_TEST_LEVELS[Math.min(currentRound * 2, COLOR_TEST_LEVELS.length - 2)];
        const correctSquareIndex = Math.floor(Math.random() * 3);
        
        squaresContainer.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const square = createElement('div', {
                className: 'color-square-item',
                style: `background-color:${i === correctSquareIndex ? differentColor : BASE_BLUE_COLOR};`
            });
            square.onclick = () => {
                if (testInProgress && currentRound < COLOR_TEST_ROUNDS) {
                    const isCorrect = i === correctSquareIndex;
                    if (isCorrect) score++;
                    feedbackText.textContent = `${isCorrect ? 'Correct!' : 'Incorrect.'} Level: ${COLOR_TEST_LEVELS[Math.min(currentRound * 2 + 1, COLOR_TEST_LEVELS.length - 1)]}`;
                    testInProgress = false;
                    squaresContainer.style.opacity = '0';
                    setTimeout(() => {
                        currentRound++;
                        if (currentRound < COLOR_TEST_ROUNDS) {
                            startNextRound();
                        } else {
                            feedbackText.textContent = `Test finished! You got ${score}/${COLOR_TEST_ROUNDS} correct.`;
                            progressText.textContent = '';
                            if (typeof onComplete === 'function') onComplete('color', score);
                        }
                    }, 1000);
                }
            };
            squaresContainer.appendChild(square);
        }
        
        feedbackText.textContent = `Trial ${currentRound + 1}/${COLOR_TEST_ROUNDS}. Level: ${COLOR_TEST_LEVELS[Math.min(currentRound * 2 + 1, COLOR_TEST_LEVELS.length - 1)]}`;
        progressText.textContent = `Correct: ${score}/${currentRound}`;
        startButton.style.display = 'none';
        squaresContainer.style.opacity = '1';
    }

    startButton.onclick = () => {
        if (testResults.color !== null) return;
        currentRound = 0;
        score = 0;
        startNextRound();
    };

    if (testResults.color !== null) {
        startButton.style.display = 'none';
        feedbackText.textContent = `Result: ${testResults.color}/${COLOR_TEST_ROUNDS} correct.`;
        progressText.textContent = '';
        squaresContainer.innerHTML = '';
    } else {
        feedbackText.textContent = 'Result: Not tested';
        progressText.textContent = '';
    }

    parent.appendChild(startButton);
    parent.appendChild(feedbackText);
    parent.appendChild(squaresContainer);
    parent.appendChild(progressText);
}

function renderFlickerTest(parent: HTMLElement, onComplete: (testName: 'flicker', result: number) => void) {
    let flickerHz = 5;
    let isFlickering = false;
    let flickerInterval: number | null = null;
    let flickerToggle = true;

    const flickerBox = createElement('div', { className: 'flicker-box-display', style: `background-color:${BASE_BLUE_COLOR};` });
    const sliderGroup = createElement('div', { className: 'flicker-slider-group' });
    const sliderLabel = createElement('label', { htmlFor: 'flicker-speed-slider', textContent: `Flicker Speed: ${flickerHz} Hz` });
    const slider = createElement('input', { type: 'range', id: 'flicker-speed-slider', min: '5', max: '75', value: flickerHz, step: '1', className: 'custom-range' });
    sliderGroup.appendChild(sliderLabel);
    sliderGroup.appendChild(slider);

    const buttonGroup = createElement('div', { style: 'display:flex; gap:0.75rem;' });
    const startButton = createElement('button', { className: 'primary-button', textContent: 'Start Flicker' });
    const submitButton = createElement('button', { className: 'confirm-button', textContent: 'Submit Threshold', disabled: true });
    buttonGroup.appendChild(startButton);
    buttonGroup.appendChild(submitButton);

    const resultText = createElement('p', { className: 'test-result-text', textContent: 'Result: Not tested' });

    slider.oninput = (e) => {
        if (isFlickering) {
            flickerHz = parseInt((e.target as HTMLInputElement).value);
            sliderLabel.textContent = `Flicker Speed: ${flickerHz} Hz`;
            updateFlicker();
        }
    };

    function updateFlicker() {
        if (flickerInterval) {
            clearInterval(flickerInterval);
            flickerInterval = null;
        }
        if (!isFlickering) {
            flickerBox.style.backgroundColor = BASE_BLUE_COLOR;
            return;
        }
        flickerInterval = setInterval(() => {
            flickerToggle = !flickerToggle;
            flickerBox.style.backgroundColor = flickerToggle ? BASE_BLUE_COLOR : '#0f172a';
        }, 1000 / (2 * flickerHz));
    }

    startButton.onclick = () => {
        if (testResults.flicker !== null) return;
        isFlickering = !isFlickering;
        startButton.textContent = isFlickering ? 'Stop Flicker' : 'Start Flicker';
        startButton.className = isFlickering ? 'secondary-button' : 'primary-button';
        submitButton.disabled = !isFlickering;
        updateFlicker();
    };

    submitButton.onclick = () => {
        if (flickerInterval) {
            clearInterval(flickerInterval);
            flickerInterval = null;
        }
        isFlickering = false;
        startButton.textContent = 'Start Flicker';
        startButton.className = 'primary-button';
        startButton.disabled = true;
        submitButton.disabled = true;
        slider.disabled = true;
        resultText.innerHTML = `<span class="font-semibold">Result: ${flickerHz} Hz</span>`;
        if (typeof onComplete === 'function') onComplete('flicker', flickerHz);
    };

    if (testResults.flicker !== null) {
        startButton.disabled = true;
        submitButton.disabled = true;
        slider.disabled = true;
        resultText.innerHTML = `<span class="font-semibold">Result: ${testResults.flicker} Hz</span>`;
        sliderLabel.textContent = `Flicker Speed: ${testResults.flicker} Hz`;
        slider.value = String(testResults.flicker);
        flickerBox.style.backgroundColor = BASE_BLUE_COLOR;
    }

    parent.appendChild(flickerBox);
    parent.appendChild(sliderGroup);
    parent.appendChild(buttonGroup);
    parent.appendChild(resultText);
}

function renderContrastTest(parent: HTMLElement, onComplete: (testName: 'contrast', result: number) => void) {
    let currentRound = 0;
    let score = 0;
    let currentNumber: number, currentOpacity: number;
    let testInProgress = false;

    const canvas = createElement('canvas', { className: 'contrast-canvas-element', width: 200, height: 200 });
    const feedbackText = createElement('p', { className: 'test-result-text' });
    const inputGroup = createElement('div', { className: 'contrast-input-group' });
    const numberInput = createElement('input', { type: 'text', placeholder: 'Number', maxLength: 1, pattern: '[0-9]' });
    const checkButton = createElement('button', { className: 'confirm-button', textContent: 'Check' });
    inputGroup.appendChild(numberInput);
    inputGroup.appendChild(checkButton);
    inputGroup.style.display = 'none';

    const progressText = createElement('p', { className: 'test-result-text', style: 'font-size:0.875rem; color:#94a3b8;' });
    const startButton = createElement('button', { className: 'primary-button', textContent: 'Start Contrast Test' });

    function drawOnCanvas(number?: number, opacity?: number) {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, 200, 200);
        ctx.fillStyle = CONTRAST_CANVAS_BG;
        ctx.fillRect(0, 0, 200, 200);

        if (number !== undefined && opacity !== undefined) {
            ctx.fillStyle = `rgba(${CONTRAST_TEXT_COLOR_RGB}, ${opacity})`;
            ctx.font = '100px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(number.toString(), 100, 100);
        }
    }
    drawOnCanvas();

    function startNextRound() {
        if (currentRound >= CONTRAST_TEST_ROUNDS) return;
        testInProgress = true;
        currentNumber = Math.floor(Math.random() * 10);
        currentOpacity = CONTRAST_TEST_OPACITIES[Math.min(currentRound, CONTRAST_TEST_OPACITIES.length - 1)];
        drawOnCanvas(currentNumber, currentOpacity);

        numberInput.value = '';
        numberInput.disabled = false;
        checkButton.disabled = false;
        inputGroup.style.display = 'flex';
        feedbackText.textContent = `Trial ${currentRound + 1}/${CONTRAST_TEST_ROUNDS}. Opacity: ${(currentOpacity * 100).toFixed(0)}%`;
        progressText.textContent = `Correct: ${score}/${currentRound}`;
        startButton.style.display = 'none';
    }

    checkButton.onclick = () => {
        if (!testInProgress) return;
        const guess = parseInt(numberInput.value);
        const isCorrect = guess === currentNumber;
        if (isCorrect) score++;

        feedbackText.textContent = isCorrect ? 'Correct!' : `Incorrect. Number was ${currentNumber}.`;
        testInProgress = false;
        numberInput.disabled = true;
        checkButton.disabled = true;
        drawOnCanvas();

        setTimeout(() => {
            currentRound++;
            if (currentRound < CONTRAST_TEST_ROUNDS) {
                startNextRound();
            } else {
                feedbackText.textContent = `Test finished! You identified ${score}/${CONTRAST_TEST_ROUNDS} numbers.`;
                progressText.textContent = '';
                inputGroup.style.display = 'none';
                if (typeof onComplete === 'function') onComplete('contrast', score);
            }
        }, 1500);
    };

    startButton.onclick = () => {
        if (testResults.contrast !== null) return;
        currentRound = 0;
        score = 0;
        startNextRound();
    };

    if (testResults.contrast !== null) {
        startButton.style.display = 'none';
        inputGroup.style.display = 'none';
        feedbackText.textContent = `Result: ${testResults.contrast}/${CONTRAST_TEST_ROUNDS} correct.`;
        progressText.textContent = '';
        drawOnCanvas();
    } else {
        feedbackText.textContent = 'Result: Not tested';
        progressText.textContent = '';
    }

    parent.appendChild(startButton);
    parent.appendChild(canvas);
    parent.appendChild(feedbackText);
    parent.appendChild(inputGroup);
    parent.appendChild(progressText);
}

function renderEyestrainTest(parent: HTMLElement, onUpdate: (symptom: 'dryness' | 'blur' | 'irritation', value: number) => void, onComplete: (totalScore: number) => void) {
    const symptoms = {
        dryness: { label: "Dryness", inputEl: null as HTMLInputElement | null, valueEl: null as HTMLElement | null },
        blur: { label: "Blurriness", inputEl: null as HTMLInputElement | null, valueEl: null as HTMLElement | null },
        irritation: { label: "Irritation", inputEl: null as HTMLInputElement | null, valueEl: null as HTMLElement | null },
    };
    const grid = createElement('div', { className: 'eyestrain-grid' });
    (Object.keys(symptoms) as Array<keyof typeof symptoms>).forEach(key => {
        const symptom = symptoms[key];
        const initialValue = testResults[key] ?? 0;
        const item = createElement('div', { className: 'eyestrain-item' });
        const label = createElement('label', { htmlFor: `${key}-slider` });
        label.textContent = symptom.label + " ";
        const valueSpan = createElement('span', { className: 'eyestrain-item-value' });
        valueSpan.innerHTML = `<span class="current-value">${initialValue}</span>/10`;
        symptom.valueEl = valueSpan.querySelector('.current-value');
        label.appendChild(valueSpan);
        const slider = createElement('input', {
            type: 'range', id: `${key}-slider`, min: '0', max: '10', value: initialValue, className: 'custom-range'
        });
        slider.oninput = e => {
            const value = parseInt((e.target as HTMLInputElement).value, 10);
            if(symptom.valueEl) symptom.valueEl.textContent = String(value);
            onUpdate(key, value);
        };
        symptom.inputEl = slider;
        item.appendChild(label);
        item.appendChild(slider);
        grid.appendChild(item);
    });

    const submitButton = createElement('button', { className: 'confirm-button', textContent: 'Submit Assessment' });
    const resultText = createElement('p', { className: 'test-result-text', textContent: 'Result: Not tested' });
    
    submitButton.onclick = () => {
        if (testResults.eyestrain !== null) return;
        const totalScore = (testResults.dryness || 0) + (testResults.blur || 0) + (testResults.irritation || 0);
        resultText.innerHTML = `<span class="font-semibold">Result: Total Score ${totalScore}/30</span>`;
        Object.values(symptoms).forEach(s => { if(s.inputEl) s.inputEl.disabled = true });
        submitButton.disabled = true;
        if (typeof onComplete === 'function') onComplete(totalScore);
    };

    if (testResults.eyestrain !== null) {
        submitButton.disabled = true;
        Object.keys(symptoms).forEach(key => {
            const symptomKey = key as keyof typeof symptoms;
            if (symptoms[symptomKey].inputEl) {
                (symptoms[symptomKey].inputEl as HTMLInputElement).disabled = true;
            }
        });
        resultText.innerHTML = `<span class="font-semibold">Result: Total Score ${testResults.eyestrain}/30</span>`;
    }

    parent.appendChild(grid);
    parent.appendChild(submitButton);
    parent.appendChild(resultText);
}

function renderFinalAssessment(results: TestResults) {
    const section = createElement('section', { className: 'final-assessment-section' });
    section.appendChild(createElement('h2', { className: 'final-assessment-title', textContent: 'Your Blue Light Exposure Assessment' }));

    const content = createElement('div', { className: 'final-assessment-content' });
    content.appendChild(createElement('p', { textContent: "Thank you for completing the Blue Light Exposure Test. Below is a detailed analysis of your results, including how your performance may relate to blue light exposure effects on your eyes and sleep." }));

    let totalPoints = 0;
    interface GradedResult {
        points: number;
        status: string;
    }
    const gradedResults: Partial<Record<keyof TestResults, GradedResult>> = {};

    const testMetadata: Record<string, { name: string; desc: string; implications: Record<string, string> }> = {
        focus: { name: 'Focus Test', desc: 'Measures your saccadic eye movement accuracy and attention sustainability. Prolonged blue light exposure can fatigue the ciliary muscles responsible for focus, leading to difficulty tracking moving objects and maintaining concentration.', implications: { Excellent: 'Your eye muscles show strong resilience. This indicates a low immediate impact from screen time on your focusing ability. Maintaining good habits will preserve this.', Moderate: 'Your focus is generally good, but there are signs of emerging fatigue. This could manifest as needing to re-read sentences or losing your place while reading. Implementing the 20-20-20 rule is highly beneficial for you.', Low: 'This score suggests significant visual fatigue, which can impair tasks requiring sustained attention like reading, driving, or detail-oriented work. It\'s crucial to take frequent, longer breaks from your screen.' } },
        afterimage: { name: 'Afterimage Test', desc: 'Assesses the recovery time of your photoreceptor cells (specifically the cones) after intense light stimulation. Blue light can cause these cells to become \'bleached\' for longer, indicating higher sensitivity and potential for light-induced stress.', implications: { Short: 'Excellent photoreceptor recovery. Your eyes are not easily overwhelmed by bright light, suggesting healthy retinal function and lower sensitivity to digital screen glare.', Moderate: 'Your retinal recovery is average. You might notice temporary \'spots\' in your vision after looking away from a bright screen. Using dark mode or reducing screen brightness can help ease this.', Prolonged: 'Slow recovery is a strong indicator of high photosensitivity. This can lead to discomfort in bright environments and prolonged visual disruption after screen use. Blue light filtering glasses are strongly recommended.' } },
        color: { name: 'Color Discrimination Test', desc: 'Tests the sensitivity of your S-cones (short-wavelength cones), which are responsible for perceiving blue light. Eye strain and fatigue can temporarily reduce your ability to differentiate between subtle color nuances.', implications: { Excellent: 'Your color perception is sharp and accurate. This reflects healthy and unstrained cone cell function, allowing for clear and precise vision.', Moderate: 'You can distinguish most colors but may struggle with very similar shades. This can be an early warning sign that visual fatigue is beginning to affect your perception.', Low: 'Significant difficulty here suggests that eye fatigue is impacting your ability to process color information accurately. This could affect work where color accuracy is important and indicates a need for visual rest.' } },
        flicker: { name: 'Flicker Sensitivity Test', desc: 'Determines your Critical Flicker Fusion (CFF) threshold. This is the point where a flickering light is perceived as a steady, continuous light. A lower CFF threshold indicates a higher sensitivity to screen flicker, which is a common cause of headaches and eye strain, even if the flicker is not consciously visible.', implications: { Excellent: 'A high CFF threshold (high Hz) indicates low sensitivity to flicker. Your visual system effectively smooths over high-frequency changes, making you less prone to flicker-induced strain from most digital displays.', Moderate: 'Your flicker sensitivity is in a normal range. However, you might still experience discomfort from lower-quality screens or certain types of LED lighting. Choosing \'flicker-free\' certified monitors can be beneficial.', Low: 'A low CFF threshold (low Hz) means you are highly sensitive to flicker. This can be a major source of subconscious eye strain, headaches, and dizziness. Prioritizing flicker-free displays and avoiding fluorescent lighting is crucial for your comfort.' } },
        contrast: { name: 'Contrast Sensitivity Test', desc: 'Measures your ability to distinguish objects from their background, a crucial visual function often impaired by glare and blue light scatter within the eye. Poor contrast sensitivity can make reading on screens feel more difficult.', implications: { Excellent: 'You have superior contrast sensitivity, allowing you to see details clearly even in low-contrast situations. This is a sign of a healthy, well-functioning visual system.', Moderate: 'Your ability to discern contrast is adequate, but you may find it difficult to read text on certain background colors or in poorly lit conditions. Increasing font size and using high-contrast screen modes can help.', Low: 'Poor contrast sensitivity is a significant indicator of visual strain. You may struggle to read on-screen text, see clearly in low light, or recover from glare (e.g., from headlights at night). This strongly warrants a review of your screen setup and habits.' } },
        eyestrain: { name: 'Eye Strain Test', desc: 'This subjective assessment quantifies your personal experience of Digital Eye Strain (or Computer Vision Syndrome). It directly measures the physical discomfort you feel, which is the ultimate result of the factors tested above.', implications: { Low: 'You report minimal physical symptoms. This is excellent and suggests your current habits and/or natural resilience are effectively preventing eye strain. Keep it up.', Moderate: 'You are experiencing clear symptoms of digital eye strain. These are warning signs from your body that should not be ignored. It\'s time to be proactive with preventative measures like lubricating eye drops and scheduled breaks.', High: 'The symptoms you report are significant and likely impact your productivity and comfort. This level of strain warrants immediate changes to your workspace and habits, and a consultation with an eye care professional is highly recommended to rule out underlying issues.' } }
    };

    if (results.focus !== null) { gradedResults.focus = results.focus >= 80 ? { points: 2, status: 'Excellent' } : results.focus >= 50 ? { points: 1, status: 'Moderate' } : { points: 0, status: 'Low' }; totalPoints += gradedResults.focus.points; }
    if (results.afterimage !== null) { gradedResults.afterimage = results.afterimage <= 5 ? { points: 2, status: 'Short' } : results.afterimage <= 15 ? { points: 1, status: 'Moderate' } : { points: 0, status: 'Prolonged' }; totalPoints += gradedResults.afterimage.points; }
    if (results.color !== null) { gradedResults.color = results.color >= 5 ? { points: 2, status: 'Excellent' } : results.color >= 3 ? { points: 1, status: 'Moderate' } : { points: 0, status: 'Low' }; totalPoints += gradedResults.color.points; }
    if (results.flicker !== null) { gradedResults.flicker = results.flicker >= 50 ? { points: 2, status: 'Excellent' } : results.flicker >= 40 ? { points: 1, status: 'Moderate' } : { points: 0, status: 'Low' }; totalPoints += gradedResults.flicker.points; }
    if (results.contrast !== null) { gradedResults.contrast = results.contrast >= 5 ? { points: 2, status: 'Excellent' } : results.contrast >= 3 ? { points: 1, status: 'Moderate' } : { points: 0, status: 'Low' }; totalPoints += gradedResults.contrast.points; }
    if (results.eyestrain !== null) { gradedResults.eyestrain = results.eyestrain <= 5 ? { points: 2, status: 'Low' } : results.eyestrain <= 15 ? { points: 1, status: 'Moderate' } : { points: 0, status: 'High' }; totalPoints += gradedResults.eyestrain.points; }
    
    const overallImpact = totalPoints >= 8 ? 'Low' : totalPoints >= 4 ? 'Moderate' : 'High';
    const overallSummary = `Your results suggest a ${overallImpact.toLowerCase()} level of blue light impact on your vision and comfort. You scored ${totalPoints}/12 points.`;
    let overallAdvice = '';
    if (overallImpact === 'Low') {
        overallAdvice = 'Your eyes and attention seem minimally affected by blue light. Continue using blue light filters or limiting screen time to maintain this.';
    } else if (overallImpact === 'Moderate') {
        overallAdvice = 'You may experience some blue light effects. Consider reducing screen brightness, using blue light glasses, or taking breaks.';
    } else {
        overallAdvice = 'Your results suggest significant blue light impact, which may indicate a serious eye problem. While this test is not a medical diagnosis, we strongly recommend consulting an eye care professional for a thorough evaluation. Additionally, adopt protective measures like blue light filters.';
    }
    content.appendChild(createElement('div', { className: 'final-assessment-overall-status', innerHTML: `<h3 class="subsection-title">Overall Impact: ${overallImpact}</h3><p>${overallSummary}</p><p>${overallAdvice}</p>` }));

    const detailedList = createElement('ul', { className: 'final-assessment-list' });
    TEST_ORDER.forEach(key => {
        const testKey = key as keyof TestResults;
        const gradedResult = gradedResults[testKey];
        const rawResult = results[testKey];
        if (gradedResult && rawResult !== null) {
            let unit = key === 'focus' ? '%' : key === 'afterimage' ? 's' : (key === 'color' || key === 'contrast') ? `/${CONTRAST_TEST_ROUNDS}` : key === 'flicker' ? 'Hz' : key === 'eyestrain' ? '/30' : '';
            const listItem = createElement('li');
            listItem.innerHTML = `<strong>${testMetadata[key].name}: ${rawResult}${unit}</strong> (Status: ${gradedResult.status})<p class="detail-implication"><strong>What it means:</strong> ${testMetadata[key].desc}</p><p class="detail-implication"><strong>Your result:</strong> ${testMetadata[key].implications[gradedResult.status]}</p>`;
            detailedList.appendChild(listItem);
        }
    });
    content.appendChild(createElement('h3', { className: 'subsection-title', textContent: 'Detailed Results' }));
    content.appendChild(detailedList);

    content.appendChild(createElement('h3', { className: 'subsection-title', textContent: 'Actionable Recommendations' }));
    const recommendationsList = createElement('ul', { className: 'final-assessment-list' });
    recommendationsList.innerHTML = `<li><strong>Follow the 20-20-20 Rule:</strong> Every 20 minutes of screen time, take a 20-second break to look at something at least 20 feet away.<span class="detail-implication">This allows the focusing muscles inside your eye to relax, significantly reducing strain. Set a timer to remind yourself.</span></li><li><strong>Optimize Your Display:</strong> Activate your device's built-in blue light filter (e.g., "Night Shift," "Eye Comfort Shield"). Also, increase text size and contrast to comfortable levels.<span class="detail-implication">Reducing blue light in the evening can improve sleep quality. Making text easier to read reduces the effort your eyes have to exert.</span></li><li><strong>Control Your Environment:</strong> Position your screen to eliminate glare from windows and overhead lights. Use soft, ambient lighting instead of harsh, direct light.<span class="detail-implication">Glare forces your eyes to work harder. Proper lighting creates a more comfortable viewing environment and reduces visual stress.</span></li><li><strong>Remember to Blink:</strong> People blink up to 66% less when staring at a screen, which leads to dry eyes. Make a conscious effort to blink fully and frequently.<span class="detail-implication">Blinking is crucial as it spreads tears across the eye's surface, keeping it lubricated and clearing away debris.</span></li>`;
    if (overallImpact !== 'Low') {
        recommendationsList.innerHTML += `<li><strong>Consider Blue Light Glasses:</strong> If you spend many hours on screens, glasses that filter blue light may help reduce strain and improve sleep patterns.<span class="detail-implication">Look for reputable brands that specify the percentage of blue light blocked.</span></li><li><strong>Consult a Professional:</strong> If symptoms of eye strain are persistent or severe, schedule an exam with an optometrist or ophthalmologist.<span class="detail-implication">They can rule out underlying conditions and provide personalized recommendations for your visual health.</span></li>`;
    }
    content.appendChild(recommendationsList);

    content.appendChild(createElement('p', { className: 'final-disclaimer', textContent: 'Disclaimer: This test is not a substitute for professional medical advice. Consult an eye care specialist for a comprehensive evaluation.' }));
    section.appendChild(content);
    return section;
}

// --- MAIN APP RENDER ---

function renderApp() {
    clearElement(appRoot);
    if (!appRoot) return;
    appRoot.appendChild(renderHeader());

    const mainContent = createElement('main', { className: 'container' });

    if (currentView === 'home') {
        mainContent.appendChild(renderHero(() => {
            currentView = 'tests';
            currentTestIndex = 0;
            renderApp();
        }));
        mainContent.appendChild(renderAdPlaceholder());
        mainContent.appendChild(createElement('div', { className: 'hero-intro-text', innerHTML: '<p>Our eyes are not designed for hours of close-up screen time. This collection of quick, scientific-based tests helps you understand the effects of your digital habits. By identifying areas of sensitivity, you can take targeted steps to improve your eye comfort and overall digital wellness.</p>' }));
    } else if (currentView === 'tests') {
        const testsContainer = createElement('div', { className: 'tests-container' });
        testsContainer.appendChild(renderTestCard('1. Focus Test', 'Click the moving dot as accurately as you can.', (el) => renderFocusTest(el, completeTest), 'focus-test-card', testResults.focus !== null, currentTestIndex === 0));
        testsContainer.appendChild(renderTestCard('2. Afterimage Test', `Stare at the blue square for ${AFTERIMAGE_STARE_SECONDS} seconds, then time the duration of the afterimage.`, (el) => renderAfterimageTest(el, completeTest), 'afterimage-test-card', testResults.afterimage !== null, currentTestIndex === 1));
        testsContainer.appendChild(renderTestCard('3. Color Discrimination Test', 'In each trial, click the square that has a different shade of blue.', (el) => renderColorTest(el, completeTest), 'color-test-card', testResults.color !== null, currentTestIndex === 2));
        testsContainer.appendChild(renderTestCard('4. Flicker Sensitivity Test', 'Adjust the slider until the flickering box appears as a solid, steady color.', (el) => renderFlickerTest(el, completeTest), 'flicker-test-card', testResults.flicker !== null, currentTestIndex === 3));
        testsContainer.appendChild(renderTestCard('5. Contrast Sensitivity Test', 'Identify the faint number hidden in the box.', (el) => renderContrastTest(el, completeTest), 'contrast-test-card', testResults.contrast !== null, currentTestIndex === 4));
        testsContainer.appendChild(renderTestCard('6. Eye Strain Symptoms', 'Rate your current level of eye discomfort.', (el) => renderEyestrainTest(el, (symptom, value) => { testResults[symptom] = value; }, (totalScore) => completeTest('eyestrain', totalScore)), 'eyestrain-test-card', testResults.eyestrain !== null, currentTestIndex === 5));
        mainContent.appendChild(testsContainer);

        if (TEST_ORDER.every(key => (testResults as any)[key] !== null)) {
            mainContent.appendChild(renderAdPlaceholder());
            mainContent.appendChild(renderFinalAssessment(testResults));
        }
    } else if (currentView === 'blog') {
        if (selectedArticleIndex > -1) {
            renderArticleDetail(mainContent, selectedArticleIndex);
        } else {
            renderBlogList(mainContent);
        }
    }

    appRoot.appendChild(mainContent);
    appRoot.appendChild(renderFooter());
}

document.addEventListener('DOMContentLoaded', renderApp);