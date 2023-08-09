from flask import Flask, render_template, request, redirect, url_for, session, jsonify

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Simulated vote data - replace with your actual data retrieval logic
vote_data = [0, 0, 0]

# Mapping of candidates to their index in the vote_data list
candidate_index = {
    'candidate1': 0,
    'candidate2': 1,
    'candidate3': 2
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Handle user sign up logic
        # After successful sign up, redirect to the login page
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Handle user login logic
        # After successful login, redirect to the vote page
        return redirect(url_for('vote'))
    return render_template('login.html')

@app.route('/results')
def results():
    return render_template('results.html')

@app.route('/vote', methods=['GET', 'POST'])
def vote():
    if request.method == 'POST':
        try:
            data = request.get_json()
            selected_candidate = data['candidate']
            # Update vote data - replace with your actual data update logic
            vote_data[candidate_index[selected_candidate]] += 1
            return redirect(url_for('results'))  # Redirect to results page
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    return render_template('vote.html')

@app.route('/submit_vote', methods=['POST'])
def submit_vote():
    # This route is not needed if you're handling vote submission in the /vote route
    pass

@app.route('/get_vote_data')
def get_vote_data():
    try:
        return jsonify(vote_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
