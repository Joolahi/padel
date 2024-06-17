// Firebase konfiguraatio
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialisoi Firebase
firebase.initializeApp(firebaseConfig);

// Viittaus Firestoreen
const db = firebase.firestore();

// Lomakkeen käsittely
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

// Hakee joukkueet Firestoresta ja näyttää ne kortteina
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

// Alustaa joukkueiden hakemisen sivun latauksen yhteydessä
document.addEventListener('DOMContentLoaded', function() {
    fetchTeams();
});
