# Gmail Multiplier

Gmail Multiplier is a web-based tool that generates multiple variations of a Gmail address. It's useful for creating disposable email addresses or managing multiple accounts with a single Gmail address.

## Features

- Generate email variations by adding dots to the local part of the Gmail address
- Create email aliases using a predefined list
- Copy individual email addresses or all generated addresses at once
- Responsive design for desktop and mobile use

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/enjeyisback/gmail-multiplier.git
   ```

2. Navigate to the project directory:
   ```
   cd gmail-multiplier
   ```

3. Ensure you have PHP installed on your system.

4. The `alias.txt` file is already included in the repository. You can modify it to add or remove aliases as needed.

## Usage

1. Start a PHP server in the project directory:
   ```
   php -S localhost:8000
   ```

2. Open a web browser and navigate to `http://localhost:8000`

3. Enter a Gmail address and the number of variations you want to generate.

4. Click "Generate" to create email variations and aliases.

5. Use the "Copy" buttons to copy individual email addresses or "Copy All" to copy all generated addresses.

## File Structure

- `index.html`: The main HTML file for the web interface
- `styles.css`: CSS file for styling the web interface
- `script.js`: JavaScript file containing the core functionality
- `get_aliases.php`: PHP script to read aliases from the text file
- `alias.txt`: Text file containing email aliases (one per line)
- `mailmultiply.sh`: Original Bash script (not used in the web version)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

enjeyisback

Project Link: [https://github.com/enjeyisback/gmail-multiplier](https://github.com/enjeyisback/gmail-multiplier)

## Acknowledgments

- Inspired by the original [mailmultiply](https://github.com/3xploitGuy/mailmultiply) project by Sandesh (3xploitGuy)
- Adapted for web use with HTML, CSS, and JavaScript
