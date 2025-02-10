import json
import os
import random

def remove_duplicate_questions(data):
    unique_questions = []
    seen_questions = set()
    duplicates_count = 0

    for quiz in data:
        unique_quiz = {"title": quiz["title"], "questions": []}
        for question in quiz["questions"]:
            if question["question"] not in seen_questions:
                seen_questions.add(question["question"])
                unique_quiz["questions"].append(question)
            else:
                duplicates_count += 1
        unique_questions.append(unique_quiz)
    
    return unique_questions, duplicates_count

def shuffle_options(options, correct_answer_index):
    shuffled_options = options[:]
    random.shuffle(shuffled_options)
    new_answer_index = shuffled_options.index(options[correct_answer_index])
    return shuffled_options, new_answer_index

def randomize_quiz_data(data):
    shuffled_questions_count = 0
    for quiz in data:
        random.shuffle(quiz["questions"])  # Shuffle the order of questions
        for question in quiz["questions"]:
            correct_answer_index = question["answer"]
            shuffled_options, new_answer_index = shuffle_options(question["options"], correct_answer_index)
            question["options"] = shuffled_options
            question["answer"] = new_answer_index
            shuffled_questions_count += 1
    return shuffled_questions_count

def convert_answers_to_indices(data, file_path):
    converted = False  # Track if conversion happened
    for quiz in data:
        for question in quiz["questions"]:
            options = question["options"]
            answer = question["answer"]
            if isinstance(answer, str):
                if answer in options:
                    question["answer"] = options.index(answer)
                    converted = True
                else:
                    print(f"Warning: Answer '{answer}' not found in options for question '{question['question']}' in {file_path}")
    
    return converted

def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)

        # Convert string answers to indices first
        converted = convert_answers_to_indices(data, file_path)
        
        # Remove duplicate questions
        unique_data, total_duplicates = remove_duplicate_questions(data)
        
        # Shuffle questions and options
        total_shuffled = randomize_quiz_data(unique_data)

        # Save the processed data
        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(unique_data, file, indent=4, ensure_ascii=False)

        print(f"Processed file: {file_path} - {total_duplicates} duplicate(s) removed, {total_shuffled} question(s) shuffled.")
        if converted:
            print(f"Answers converted to indices for: {file_path}")
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_folder(folder_path):
    if not os.path.isdir(folder_path):
        print(f"Error: {folder_path} is not a valid directory.")
        return
    
    for filename in os.listdir(folder_path):
        if filename.endswith(".json"):
            file_path = os.path.join(folder_path, filename)
            process_file(file_path)

# Example usage
json_folder_path = "public\\quizdata\\Polity"  # Replace with your folder path
process_folder(json_folder_path)