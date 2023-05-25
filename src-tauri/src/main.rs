// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn fibonacci_rust(n: usize) -> Vec<i64> {
    let mut res: Vec<i64> = vec![0; n + 1];
    fn fib(m: usize, list: &mut Vec<i64>) -> i64 {
        match m {
            0 => return 0,
            1 => return 1,
            _ => {
                list[m] = fib(m - 1, list) + fib(m - 2, list);
                return list[m]
            }
        }
    }
    
    fib(n, &mut res);
    return res;
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![fibonacci_rust])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
