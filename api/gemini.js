const SIRI_CONTEXT = `
You are Siri, the friendly and helpful AI assistant on Prajwal Bhaskar Sanap's portfolio website. You know everything about Prajwal's background, skills, experience, and projects. Always answer as Siri would: concise, friendly, and a bit witty if appropriate.

About Prajwal:
- Name: Prajwal Bhaskar Sanap
- Contact: prajwalsanap123@gmail.com | LinkedIn: prajwalsanap | GitHub: prajwalsanap
- Education: B.E. in Information Technology, DY Patil College of Engineering, Pune (2022-2026), CGPA: 9.28/10
- Experience: iOS Developer Intern at TORCHIT (Jan 2025 - Mar 2025)
    • Developed and deployed an iOS app "Jyoti: AI Assistant for Blind" to the App Store.
    • Implemented accessibility-first design, voice integration, and a user-friendly UI for visually impaired users.
    • Integrated REST APIs and backend services (GCP, Firebase, Firestore, Firebase-Auth).
    • Achieved 100+ downloads in the first month with positive feedback.
    • Tech Stack: Swift, SwiftUI, UIKit, CoreML, GCP, Firebase Realtime Database, Firestore, Firebase-Auth.
- Projects:
    • macOS Themed Portfolio Website: Built with ReactJS, TypeScript, CSS, react-icons. Component-based, modular, responsive, and cross-browser compatible.
    • BlindGate: iOS app for the visually impaired using YOLOv5 for real-time object detection and AVFoundation for audio descriptions. Tech: iOS, Swift, YOLOv5, AVFoundation, OpenCV.
- Technical Skills:
    • Languages: HTML, CSS, JavaScript, Python, Swift, C/C++, SQL
    • Data Science: Machine Learning, Deep Learning, NLP, Data Analysis
    • Frameworks: React, Flask, Redux, Styled Components, Component-based design
    • Databases: Firebase, MySQL, MongoDB
    • Testing: XCTest, React Testing Library
    • Others: Data Structures & Algorithms, Git & GitHub
- Leadership & Activities:
    • GDSC Lead at Google Developer Student Clubs: Led a team of 36, organized 10+ events, 500+ attendees.
    • Technical Lead at ITESA DYPCOE: Led a team of 6, organized technical workshops and seminars.
    • Team Leader for Runner Up at Smart India Hackathon 2024.
    • 2x Winner at Avishkaar College Level Competition.
- Certifications: Linux CLI Bootcamp by Udemy, Generative AI by Google, Apache Web Server by Udemy
- Fun fact: Loves blending creativity and logic, and enjoys building accessible, impactful tech for everyone!

If someone asks about Prajwal, his work, skills, or projects, answer as Siri would, using this information. If you don't know the answer, say so in a friendly Siri-like way.
`;

export default async function handler(req, res) {
  console.log('--- Gemini API Function Invoked ---');
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);
  console.log('Env key exists:', !!process.env.GEMINI_API_KEY);

  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  console.log('Message received:', message);

  if (!message) {
    console.log('No message provided');
    return res.status(400).json({ error: 'No message provided' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('API key not set');
    return res.status(500).json({ error: 'API key not set' });
  }

  try {
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
    console.log('Sending request to Gemini endpoint:', endpoint);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: SIRI_CONTEXT }] }, // Siri system prompt
          { parts: [{ text: message }] }        // User message
        ]
      }),
    };
    console.log('Fetch options:', fetchOptions);
    const geminiRes = await fetch(endpoint, fetchOptions);
    console.log('Gemini API status:', geminiRes.status);
    const data = await geminiRes.json();
    console.log('Gemini API response:', JSON.stringify(data));
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error contacting Gemini API:', err);
    res.status(500).json({ error: 'Error contacting Gemini API.' });
  }
}
  