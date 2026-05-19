// --- INITIALIZE AOS ---
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
    });

    // --- INITIALIZE VANTA 3D BACKGROUND ---
    if (window.VANTA) {
        window.VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xa855f7,
            backgroundColor: 0x050510,
            points: 15.00,
            maxDistance: 25.00,
            spacing: 16.00,
            showDots: true
        });
    }
});

// --- SUPABASE INITIALIZATION ---
// Replace the placeholders with your actual Supabase project URL and anon key.
// You can obtain them from the Supabase dashboard > Settings > API.
const SUPABASE_URL = 'https://YOUR-PROJECT-ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- CONTACT FORM LOGIC (updated for Supabase) ---
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const company = document.getElementById('contactCompany').value;
        const message = document.getElementById('contactMessage').value;
        submitBtn.textContent = 'SUBMITTING...';
        submitBtn.disabled = true;
        try {
            const { data, error } = await supabase.from('messages').insert([
                { name, email, company, message }
            ]);
            if (error) {
                throw error;
            }
            formStatus.style.display = 'block';
            formStatus.style.color = '#ffffff';
            formStatus.style.background = '#00509d';
            formStatus.textContent = 'Message Received Successfully.';
            contactForm.reset();
        } catch (err) {
            formStatus.style.display = 'block';
            formStatus.style.color = '#ffffff';
            formStatus.style.background = '#d90429';
            formStatus.textContent = err.message || 'Submission Failed.';
        } finally {
            submitBtn.textContent = 'SUBMIT INQUIRY';
            submitBtn.disabled = false;
        }
    });
}
