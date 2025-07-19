import os
import re

def contains_chinese(text):
    # Matches any CJK Unified Ideographs
    return re.search(r'[\u4e00-\u9fff]', text)

def find_chinese_files(root_dir):
    chinese_files = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    for line in f:
                        if contains_chinese(line):
                            chinese_files.append(file_path)
                            break
            except Exception:
                continue  # Skip files that can't be read as text
    return chinese_files

if __name__ == "__main__":
    repo_dir = os.path.dirname(os.path.abspath(__file__))
    result = find_chinese_files(repo_dir)
    with open("chinese_files.txt", "w", encoding="utf-8") as out:
        for path in result:
            out.write(path + "\n")
    print(f"Found {len(result)} files containing Chinese text. See chinese_files.txt.")