document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('voteChart').getContext('2d');
    var voteChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Option 1', 'Option 2', 'Option 3'],
            datasets: [{
                label: 'Votes',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    function updateChart(data) {
        voteChart.data.datasets[0].data = data;
        voteChart.update();
    }

    // Handle form submission
    var voteForm = document.getElementById('voteForm');
    voteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var selectedCandidate = voteForm.candidate.value;
        submitVote(selectedCandidate);
    });

    // Function to submit a vote
    function submitVote(candidate) {
        // Simulated vote submission - replace with actual AJAX request
        fetch('/submit_vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ candidate: candidate })
        })
        .then(response => response.json())
        .then(data => {
            // Fetch updated vote data
            fetch('/get_vote_data') // Replace with the actual URL to fetch vote data
                .then(response => response.json())
                .then(data => {
                    // Update vote chart with new data
                    updateChart(data);
                })
                .catch(error => {
                    console.error('Error fetching vote data:', error);
                });
        })
        .catch(error => {
            console.error('Error submitting vote:', error);
        });
    }

    // Initial data fetch
    fetch('/get_vote_data') // Replace with the actual URL to fetch initial vote data
        .then(response => response.json())
        .then(data => {
            updateChart(data);
        })
        .catch(error => {
            console.error('Error fetching initial vote data:', error);
        });

    // Periodically update the chart with vote data
    setInterval(function() {
        fetch('/get_vote_data') // Replace with the actual URL to fetch updated vote data
            .then(response => response.json())
            .then(data => {
                updateChart(data);
            })
            .catch(error => {
                console.error('Error fetching vote data:', error);
            });
    }, 5000); // Update every 5 seconds
});
