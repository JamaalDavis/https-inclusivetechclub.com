import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
}

// Initialize the Google Gen AI SDK
const ai = new GoogleGenAI({ apiKey });

// API Route: Generate Skill Pack
app.post('/api/generate-skill-pack', async (req, res) => {
  const { firstName, email, focusArea } = req.body;

  if (!firstName || !email || !focusArea) {
    return res.status(400).json({ error: 'Missing required fields: firstName, email, focusArea' });
  }

  try {
    const prompt = `
      You are an expert developer workflow consultant specializing in inclusive design, web accessibility (WCAG 2.2), and AI safety/ethics.
      Generate a customized, professional, and actionable Claude Code Skill Pack for a user with the following profile:
      - Name: ${firstName}
      - Email: ${email}
      - Primary Focus Area: ${focusArea} (either 'strategy', 'operations', or 'growth')

      Focus Area Guidance:
      - strategy: Focus on ethical red-teaming, privacy, identifying model bias in datasets, and systemic risks. The Claude Code system configuration should act as ADV-ETHICAL-RED-TEAMER.
      - operations: Focus on accessible UI component specs, WCAG keyboard mapping, visual focus-visible rules. The Claude Code system configuration should act as A11Y-COMPONENT-CHECKER.
      - growth: Focus on high-velocity reactive validations, aria-labels, touch target sizing (44px), and copywriting/cognitive bias checks. The Claude Code system configuration should act as RESPONSIVE-HOTFIX-rem.

      Generate a structured JSON response.
      The output must exactly follow this schema:
      {
        "title": "A short descriptive profile title, starting with 'Velocity Profile: ...'",
        "description": "A comprehensive paragraph describing the custom calibration based on their focus area.",
        "keySignals": [
          "An array of 3 specific actions, programmatic triggers, or metrics they should check while coding (string format)"
        ],
        "remediationSystems": [
          "An array of 2 active Claude Code instruction rules or setup actions (string format)"
        ],
        "promptContent": "The exact markdown content of the custom ruleset file, starting with '## Custom Claude Code Instructions' and including a fenced markdown block specifying the system configuration (e.g. '# SYSTEM: ...'). This ruleset must detail guidelines tailored to their focus area."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            title: { type: 'STRING' },
            description: { type: 'STRING' },
            keySignals: {
              type: 'ARRAY',
              items: { type: 'STRING' }
            },
            remediationSystems: {
              type: 'ARRAY',
              items: { type: 'STRING' }
            },
            promptContent: { type: 'STRING' }
          },
          required: ['title', 'description', 'keySignals', 'remediationSystems', 'promptContent']
        }
      }
    });

    const resultText = response.text;
    const resultJson = JSON.parse(resultText || '{}');

    res.json(resultJson);
  } catch (error) {
    console.error('Error generating skill pack:', error);
    res.status(500).json({ error: 'Failed to generate custom skill pack dynamically from Gemini API' });
  }
});

// Serve static assets in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  // If it's an API route or looks like a file request, skip static serving and let it 404
  if (req.path.startsWith('/api') || req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
