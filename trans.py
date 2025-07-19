import os
import requests
import re

API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "google/gemini-2.5-flash-lite-preview-06-17"  # Free model
API_KEY = ""

def clean_markdown_escapes(text, original_text):
    """
    Remove unwanted markdown code block escapes that AI might add.
    Preserves original markdown blocks if they existed in the source.
    """
    # Check if original text had markdown code blocks
    original_has_markdown = bool(re.search(r'```\w*', original_text))
    
    # If original didn't have markdown blocks, remove any that AI added
    if not original_has_markdown:
        # Remove markdown code block markers (```language and ```)
        text = re.sub(r'^```\w*\n?', '', text, flags=re.MULTILINE)
        text = re.sub(r'\n?```$', '', text, flags=re.MULTILINE)
        text = re.sub(r'\n```\n?', '\n', text)
    
    # Remove extra newlines that might be introduced
    text = re.sub(r'\n{3,}', '\n\n', text)
    
    # Ensure the text ends properly (maintain original ending format)
    if original_text.endswith('\n') and not text.endswith('\n'):
        text += '\n'
    elif not original_text.endswith('\n') and text.endswith('\n'):
        text = text.rstrip('\n')
    
    return text

def translate_text(text, original_text):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "Translate all content to English. Only output the translation. You must not include any escape comments for the block of code that are not originally there, such as \"'''typescript\". Do not wrap the translation in markdown code blocks unless they were present in the original text."},
            {"role": "user", "content": text}
        ]
    }
    response = requests.post(API_URL, headers=headers, json=data)
    response.raise_for_status()
    translated = response.json()["choices"][0]["message"]["content"]
    
    # Clean any unwanted markdown escapes
    cleaned_translation = clean_markdown_escapes(translated, original_text)
    
    return cleaned_translation

def process_files(txt_path):
    with open(txt_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    for i, line in enumerate(lines):
        file_path = line.strip()
        if not file_path or file_path.startswith("#") or not os.path.isfile(file_path):
            continue
        print(f"Translating: {file_path}")
        try:
            with open(file_path, "r", encoding="utf-8") as src:
                original_content = src.read()
            
            # Skip empty files
            if not original_content.strip():
                print(f"Skipping empty file: {file_path}")
                lines[i] = f"# {file_path} (empty)\n"
                continue
            
            translated = translate_text(original_content, original_content)
            
            # Validate that translation is not empty
            if not translated.strip():
                print(f"Warning: Translation for {file_path} is empty, skipping...")
                continue
            
            # Create backup before writing
            backup_path = f"{file_path}.backup"
            with open(backup_path, "w", encoding="utf-8") as backup:
                backup.write(original_content)
            
            with open(file_path, "w", encoding="utf-8") as dst:
                dst.write(translated)
            
            print(f"Successfully translated {file_path} (backup saved as {backup_path})")
            
            # Comment the file path in the txt file
            lines[i] = f"# {file_path}\n"
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    with open(txt_path, "w", encoding="utf-8") as f:
        f.writelines(lines)

if __name__ == "__main__":
    if not API_KEY:
        print("Please set the OPENROUTER_API_KEY environment variable.")
    else:
        process_files("chinese_files.txt")
