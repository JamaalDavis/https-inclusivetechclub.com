/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export default async function handler(req, res) {
  // Add CORS headers for Vercel preview environments
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, email, focusArea } = req.body;

  if (!firstName || !email || !focusArea) {
    return res.status(400).json({ error: 'Missing required fields: firstName, email, focusArea' });
  }

  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment.");
    return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
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

    res.status(200).json(resultJson);
  } catch (error) {
    console.error('Error generating skill pack:', error);
    res.status(500).json({ error: 'Failed to generate custom skill pack dynamically from Gemini API' });
  }
}
