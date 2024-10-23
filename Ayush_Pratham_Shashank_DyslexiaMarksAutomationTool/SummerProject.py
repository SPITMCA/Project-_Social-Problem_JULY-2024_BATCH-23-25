import pandas as pd
import openpyxl
from openpyxl.styles import Font
import os
from tkinter import Tk, filedialog, messagebox, Toplevel, Text, Scrollbar, RIGHT, Y, END
from tkinter import ttk
# 2061730
def process_file(file_path):
    try:
        marks_data = pd.read_excel(file_path, engine='xlrd')
        columns_to_check = ['P1_T', 'P2_T', 'P3_T', 'P4_T', 'P5_T', 'P6_T']
        extra_columns = ['P1_T_EX', 'P2_T_EX', 'P3_T_EX', 'P4_T_EX', 'P5_T_EX', 'P6_T_EX']
        output_columns = ['P1_T_224', 'P2_T_224', 'P3_T_224', 'P4_T_224', 'P5_T_224', 'P6_T_224']
        marks_data[extra_columns] = marks_data[extra_columns].fillna(0)
        
        def calculate_sums_and_mask(row):
            sums = 0
            mask = False
            for main_col, extra_col in zip(columns_to_check, extra_columns):
                if (row[main_col] + row[extra_col]) < 40:
                    sums += 40 - (row[main_col] + row[extra_col])
                    mask = True
            return sums, mask

        marks_data[['sums', 'mask']] = marks_data.apply(lambda row: pd.Series(calculate_sums_and_mask(row)), axis=1)
        filtered_data = marks_data[(marks_data['mask']) & (marks_data['sums'] <= 18) & (marks_data['sums'] >= 0)]
        filtered_data = filtered_data.drop(columns=['sums', 'mask'])
        filtered_data[output_columns] = 0

        def update_output_columns_and_conflg(row):
            update_needed = False
            for main_col, extra_col, out_col in zip(columns_to_check, extra_columns, output_columns):
                total = row[main_col] + row[extra_col]
                if total < 40:
                    row[out_col] = 40 - total
                    update_needed = True
            if update_needed:
                row['CONFLG'] = str(row.get('CONFLG', '')) + 'W'
            return row

        filtered_data = filtered_data.apply(update_output_columns_and_conflg, axis=1)
        display_data(filtered_data, output_columns)

    except Exception as e:
        messagebox.showerror("Error", str(e))

def display_data(filtered_data, output_columns):
    new_window = Toplevel()
    new_window.title("Filtered Data")
    screen_width = new_window.winfo_screenwidth()
    screen_height = new_window.winfo_screenheight()
    window_width = int(screen_width * 0.75)
    window_height = int(screen_height * 0.75)
    new_window.geometry(f"{window_width}x{window_height}")
    text = Text(new_window, wrap="none", font=("Arial", 12))
    text.pack(side="left", fill="both", expand=True)
    scrollbar = Scrollbar(new_window, orient="vertical", command=text.yview)
    scrollbar.pack(side=RIGHT, fill=Y)
    text.configure(yscrollcommand=scrollbar.set)
    text.tag_configure("highlight", background="yellow")
    headers = "\t".join(filtered_data.columns) + "\n"
    text.insert(END, headers, "header")
    for idx, row in filtered_data.iterrows():
        for col in filtered_data.columns:
            value = row[col]
            if col in output_columns and value > 0:
                text.insert(END, f"{value}\t", "highlight")
            else:
                text.insert(END, f"{value}\t")
        text.insert(END, "\n")

def upload_and_process():
    file_path = filedialog.askopenfilename(
        title="Select an Excel file",
        filetypes=[("Excel files", "*.xls")]
    )
    
    if file_path:
        if file_path.lower().endswith('.xls'):
            process_file(file_path)
        else:
            messagebox.showerror("Invalid File", "Only '.xls' files are allowed.")
    else:
        messagebox.showinfo("Cancelled", "No file was selected.")

def main():
    root = Tk()
    root.title("Excel Filter")
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    window_width = int(screen_width * 0.75)
    window_height = int(screen_height * 0.75)
    root.geometry(f"{window_width}x{window_height}")
    style = ttk.Style()
    style.theme_use('clam')
    style.configure('TLabel', background='grey30', foreground='white', font=('Arial', 16))
    style.configure('TButton', background='grey50', foreground='white', font=('Arial', 14), padding=10)
    root.configure(background='grey30')
    label = ttk.Label(root, text="Upload an Excel file to filter")
    label.pack(pady=20)
    upload_button = ttk.Button(root, text="Upload File", command=upload_and_process)
    upload_button.pack(pady=20)
    root.mainloop()

if __name__ == "__main__":
    main()
