
const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID
};

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const teamName = document.getElementById('teamName').value;
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    db.collection('teams').add({
        name: teamName,
        members: [player1, player2],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert('Team registered successfully');
        document.getElementById('registrationForm').reset();
        fetchTeams();
    })
    .catch(error => {
        console.error('Error adding team: ', error);
    });
});

function fetchTeams() {
    db.collection('teams').orderBy('timestamp', 'desc').get().then((querySnapshot) => {
        const teamsContainer = document.getElementById('teams');
        teamsContainer.innerHTML = ''; 

        querySnapshot.forEach((doc) => {
            const team = doc.data();
            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');

            const teamName = document.createElement('h3');
            teamName.textContent = team.name;

            const teamMembers = document.createElement('p');
            teamMembers.textContent = `Members: ${team.members.join(', ')}`;

            teamCard.appendChild(teamName);
            teamCard.appendChild(teamMembers);
            teamsContainer.appendChild(teamCard);
        });
    }).catch((error) => {
        console.error('Error fetching teams: ', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetchTeams();
});
