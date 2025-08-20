import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './App.css';
import logo from './assets/logo.png';


function App() {
  const form = useRef();
  const [bookingId, setBookingId] = useState('');
  const months = [ "January","February","March","April","May","June","July","August","September","October","November","December"];
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  // Only allow current month and next month, year fixed as 2025
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-11
  const nextMonth = currentMonth + 1
  //const minDate = new Date(2025, currentMonth, 1).toISOString().split('T')[0]; // 1st day of current month
  //const maxDate = new Date(2025, currentMonth + 1, new Date(2025, currentMonth + 2, 0).getDate()).toISOString().split('T')[0]; // last day of next month

  const monthOptions = [
  { value: currentMonth, label: today.toLocaleString('default', { month: 'long' }) },
  { value: nextMonth, label: new Date(2025, nextMonth).toLocaleString('default', { month: 'long' }) }
];
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const dateOptions = selectedMonth !== '' ? Array.from({ length: daysInMonth(2025, parseInt(selectedMonth)) }, (_, i) => i + 1) : [];
    
    const generateBookingID = () => {
      const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
      const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `BK-${date}-${randomStr}`;
    };
    useEffect(() => {
    setBookingId(generateBookingID());
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    const monthLabel = selectedMonth  !=='' ? months[parseInt(selectedMonth)]:'';

      const formData = {
        name: form.current.name.value,
        email: form.current.email.value,
        occupation: form.current.occupation.value,
        date: `${selectedDate}-${monthLabel}-2025 ${selectedTime}`,
        whatsapp: form.current.whatsapp.value,
        message: form.current.message.value,
        booking_id: bookingId, 
      };

      emailjs.send('service_ted5m2h', 'template_nzvxr9o', formData, 'D8Cr-U9g1MVqsc5bv')
        .then(() => {
          alert('Session request sent successfully. Our team will contact you after payment confirmation.');
          form.current.reset();
          setBookingId(generateBookingID());
          setSelectedDate("");
          setSelectedMonth("");
          setSelectedTime("");
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Something went wrong.\n' + (error?.text || error?.message || JSON.stringify(error)))
        });

      emailjs.send('service_ted5m2h', 'template_5qmfosa', formData, 'D8Cr-U9g1MVqsc5bv');
   };
    

  return (
    <div className="bg-[url('./assets/stardust.png')] bg-cover text-white font-sans">
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-black bg-opacity-60">
        <div>
          <h1 className="text-2xl font-bold">Ghar-ki-Baat</h1>
          <p className="text-sm">Your space to speak.</p>
        </div>
        <nav className="space-x-4 text-sm">
          <a href="#whatwedo">What We Do</a>
          <a href="#trust">Why Trust Us</a>
          <a href="#pricing">Pricing</a>
          <a href="#booking">Book Session</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <section className="min-h-[90vh] grid grid-cols-1 md:grid-cols-2 place-items-center p-8">
        <div>
          <h2 className="text-4xl font-semibold mb-4">When no one listens, we do.</h2>
          <p className="text-lg max-w-md">At Ghar-ki-Baat, we offer confidential talk with light therapy that prioritize your emotional wellbeing. Your journey begins with a conversation.</p>
        </div>
        <img src={logo} alt="logo" className="w-60 h-auto" />
      </section>

      <section id="whatwedo" className="p-8 bg-black bg-opacity-70">
        <h3 className="text-3xl font-semibold mb-4">What We Do</h3>
        <p className="max-w-3xl">We provide private, secure, and empathetic consultation sessions with our team. Whether it's stress, relationship, personal dilemmas, or just the need to talk, Ghar-ki-Baat is here for you.</p>
      </section>

      <section id="trust" className="p-8">
        <h3 className="text-3xl font-semibold mb-4">Why Trust Us?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <li className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">100% Confidentiality</li>
          <li className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">Caring mentors</li>
          <li className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">Flexible scheduling</li>
        </ul>
      </section>

      <section id="pricing" className="p-8 bg-black bg-opacity-70">
        <h3 className="text-3xl font-semibold mb-6">Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl shadow">
            <h4 className="text-xl font-bold mb-2">Basic ('Connect')</h4>
            <p className="mb-2">1 session (30 mins)</p>
            <p className="font-bold">₹99</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl shadow">
            <h4 className="text-xl font-bold mb-2">Standard ('Comfort')</h4>
            <p className="mb-2">1 sessions (60 mins)</p>
            <p className="font-bold">₹179</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl shadow">
            <h4 className="text-xl font-bold mb-2">Premium('Clarity')</h4>
            <p className="mb-2">5 sessions (60 mins) + reflection letter</p>
            <p className="font-bold">₹769</p>
          </div>
        </div>
      </section>

      <section id="booking" className="p-8 flex justify-center">
        <form ref={form} onSubmit={sendEmail} className="w-full max-w-lg space-y-4 bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-black p-6 rounded-xl shadow">
          <h3 className="text-2xl font-bold mb-4">Book a Session</h3>
          <input type="text" name="name" placeholder="Your Name" required className="w-full p-2 border rounded" />
          <select name="occupation" required className="w-full p-2 border rounded">
            <option value="">Select Occupation</option>
            <option>Student</option>
            <option>Working Professional</option>
            <option>Other</option>
          </select>
         <div className="flex flex-wrap gap-2 items-center mb-4">
         

          <select
            value={selectedMonth}
            onChange={(e) => { setSelectedMonth(e.target.value); setSelectedDate(''); }}
            required
            className="p-2 border rounded"
            >
            <option value="">Select Month</option>
            {monthOptions.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
            disabled={selectedMonth === ''}
            className="p-2 border rounded"
          >
            <option value="">Select Date</option>
            {dateOptions.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
            className="p-2 border rounded"
          >
            <option value="">When</option>
            <option>10:00 AM-11:00 AM</option>
            <option>3:00 PM-4:00 PM</option>
            <option>5:00 PM-6:00 PM</option>
            <option>7:00 PM-8:00 PM</option>
            <option>9:00 PM-10:00 PM</option>
            
          </select>
           <p className="text-xs text-black ">
           *This is your preferred time. Our team will contact you to confirm the final schedule.
            </p>
          </div>
          <input type="text" name="whatsapp" placeholder="WhatsApp Number (+91)" maxLength={10} pattern='[0-9]*' inputMode='numeric'onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '');}} required className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email ID" required className="w-full p-2 border rounded" />
          <textarea name="message" placeholder="What would you like to talk about?" className="w-full p-2 border rounded"></textarea>
          <a
            href='https://rzp.io/rzp/LCzTNfsR'
            target='_blank'
            rel='noreferrer'
            className='bg-black hover:bg-gray-700 text-white font-bold px-4 py-2 rounded block text-center'
          >
            Pay to Proceed
          </a>
          <p className="text-xs">Click the button to pay before submitting the booking form.</p>
          <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold px-4 py-2 rounded transition-all duration-300  ">Submit</button>
          <p className="text-xs mt-1">Our team will contact you after payment confirmation.</p>
        </form>
        
      </section>

      <section className="p-8 bg-black bg-opacity-70">
        <h3 className="text-3xl font-semibold mb-6">Testimonials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <blockquote className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">“Ghar-ki-Baat gave me the courage to open up and move forward. Highly recommended!”</blockquote>
          <blockquote className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">“I felt heard and understood. Booking was easy and fast.”</blockquote>
        </div>
      </section>

      <section id="faq" className="p-8">
        <h3 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <details className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">
            <summary className="cursor-pointer font-medium">Is my session confidential?</summary>
            <p>Yes, 100% confidentiality is maintained.</p>
          </details>
          <details className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">
            <summary className="cursor-pointer font-medium">Is the date & time i select in the booking form final?</summary>
            <p>The date & time you enter are your preferred choices. Our team will confirm the final session schedule after speaking with you.</p>
          </details>
          <details className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">
            <summary className="cursor-pointer font-medium">How will I be contacted?</summary>
            <p>You'll receive an instant confirmation mail right after submitting the booking form . Once your payment is verified , our team will contact you via WhatsApp or email.</p>
          </details>
          <details className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">
            <summary className="cursor-pointer font-medium">What if i book during late hours?</summary>
            <p>Form will be submitted after payment. Our team will get in touch with you during working hours.</p>
          </details>
           <details className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">
            <summary className="cursor-pointer font-medium">Is my booking confirmed after submitting the form?</summary>
            <p>No. The Booking ID you receive is temporary. Your booking will be confirmed only after we verify your payment. If no valid payment is found, the booking will be consider invalid.</p>
          </details>
          <details className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-xl shadow">
            <summary className="cursor-pointer font-medium">Who will i be talking with?</summary>
            <p>During the finalization of your sesiion schedule, you'll be given 2-3 options of team members to connect with. You can choose the one you'd like to talk to.</p>
          </details>
        </div>
      </section>

      <section className="p-8 text-center bg-black bg-opacity-80">
        <h3 className="text-3xl font-semibold mb-4">Need Help?</h3>
        <p className="mb-4">Reach us directly for custom consultation or queries.</p>
        <div className="flex justify-center space-x-4">
          <a href="mailto:gharkibaat23@gmail.com" className="bg-blue-600 hover:bg-blue-500 text-black font-bold px-4 py-2 rounded transition-all duration-300">Email Us</a>
          <a href="https://wa.me/917064718148" target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-500 text-black font-bold px-4 py-2 rounded">WhatsApp</a>
        </div>
      </section>

      <footer className="text-center p-4 text-sm bg-black bg-opacity-70">
        <p>&copy; 2025 Ghar-ki-Baat. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
