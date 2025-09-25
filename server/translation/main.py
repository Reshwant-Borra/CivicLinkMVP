# ASSIGNMENT: Developer 2 - Translation Feature
# Backend service using deep-translator library
# This Flask service handles translation requests from the Next.js frontend

from deep_translator import GoogleTranslator
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/translate', methods=['POST'])
def translate():
    """
    Translate text using deep-translator library
    Expected JSON payload: {"text": "Hello", "target_lang": "es"}
    Returns: {"originalText": "Hello", "translatedText": "Hola", "targetLanguage": "es"}
    """
    try:
        data = request.get_json()
        text = data.get('text')
        target_lang = data.get('target_lang', 'es')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Use deep-translator with Google Translate
        translator = GoogleTranslator(source='auto', target=target_lang)
        translated = translator.translate(text)
        
        return jsonify({
            'originalText': text,
            'translatedText': translated,
            'targetLanguage': target_lang
        })
        
    except Exception as e:
        return jsonify({'error': f'Translation failed: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'translation'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
