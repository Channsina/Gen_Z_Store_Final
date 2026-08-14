import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebaseClient";

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5" fill="purple">
        <path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/>
    </svg>
);

const PhoneIcon = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="purple">
        <path d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/>
    </svg>
);

const PinIcon = () => (
    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="purple">
        <path d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"/>
    </svg>
);

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle | sending | sent | error

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
    try {
        await addDoc(collection(db, "contact_messages"), {
            ...form,
            read: false,
            createdAt: serverTimestamp(),
        });
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
    } catch (err) {
        console.error(err);
        setStatus("error");
    }
  };

  return (
    <div>
        <section className="py-16 bg-gray-100 text-purple-600">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight">
                    GET IN TOUCH WITH
                </h1>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight text-pink-500">
                    GenZ Store
                </h1>
                <p className="text-xs md:text-lg lg:text-xl mb-8 text-gray-700">
                    We'd love to hear from you — drop us a message <br /> and stay
                    connected with the latest trends!
                </p>
                <a href="#contact" className="bg-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-600"> Contact Us</a>
            </div>
        </section>

        {/* Main Content */}
        <main id="contact" className="flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full grid md:grid-cols-2 my-10">
                {/* Left Section */}
                <div className="bg-purple-700 text-white flex flex-col items-center justify-center p-10">
                    <h2 className="text-3xl font-semibold mb-4">
                    Get in touch with us
                    </h2>

                    <p className="text-center mb-12">
                    Please send us a little more detail so we can help you.
                    </p>

                    <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-lg h-10 w-10 flex items-center justify-center shadow-2xl">
                        <MailIcon />
                        </div>
                        <span>info@genzstore.com</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-lg h-10 w-10 flex items-center justify-center shadow-2xl">
                        <PhoneIcon />
                        </div>
                        <span>+855 123456789</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-xl h-10 w-10 flex items-center justify-center shadow-2xl">
                        <PinIcon />
                        </div>
                        <span>Phnom Penh, Cambodia</span>
                    </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="p-10 md:p-14 bg-gray-100">
                    <h2 className="text-4xl font-bold text-gray-700 mb-2">
                        Contact Us
                    </h2>

                    <p className="text-gray-400 mb-8">Let's send us a message</p>

                    {status === "sent" ? (
                        <div className="rounded-2xl bg-purple-50 border border-purple-200 p-6 text-purple-700">
                            Thanks! Your message has been sent — we'll get back to you
                            soon.
                        </div>
                    ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                        <label className="block text-gray-600 mb-2">
                            Full Name
                        </label>
                        <input required type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" className="w-full border-gray-300 border-1 rounded-2xl px-4 py-3 focus:outline-purple-500 focus:ring-1 focus:ring-[#4F5D46]" />
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">Email</label>
                            <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="Enter your email" className="w-full rounded-2xl px-3 py-3 border-gray-300 border-1 focus:outline-purple-500 focus:ring-1 focus:ring-[#4F5D46]"/>
                        </div>

                        <div>
                        <label className="block text-gray-600 mb-2">Message</label>
                        <textarea
                            required rows="4" name="message" value={form.message} onChange={handleChange} placeholder="Enter your message" className="w-full rounded-2xl px-4 py-3 border-gray-300 border-1 focus:outline-purple-500 focus:ring-1 focus:ring-[#4F5D46]"/>
                        </div>

                        <button type="submit" disabled={status === "sending"} className="w-full inline-block bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-600 disabled:opacity-60">
                            {status === "sending" ? "Sending..." : "Submit"}
                        </button>

                            {status === "error" && (
                        <p className="text-sm text-red-600">
                            Something went wrong. Please try again.
                        </p>
                        )}
                    </form>
                    )}
                </div>
            </div>
        </main>
    </div>
  );
}
