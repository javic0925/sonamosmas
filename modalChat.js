// Handle chat button click for chatCont (first chat button)
document.querySelector('.chatCont').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from affecting the radio container
    document.getElementById('chatModal').style.display = 'block';

    // Clear existing modal content
    document.querySelector('.modalContent').innerHTML = '<span class="closeBtn">&times;</span>';

    // Load the embed content dynamically for the first chat
    let iframe = document.createElement('iframe');
    iframe.id = 'chatIframe';
    iframe.src = 'https://www6.cbox.ws/box/?boxid=830051&boxtag=PVzb5d';
    iframe.width = '100%';
    iframe.height = '93%';
    document.querySelector('.modalContent').appendChild(iframe);

    // Reattach close button listener
    document.querySelector('.closeBtn').addEventListener('click', function() {
        document.getElementById('chatModal').style.display = 'none';
    });
});

// Handle chat button click for chatCont2 (second chat button)
document.querySelector('.chatCont2').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from affecting the radio container
    document.getElementById('chatModal').style.display = 'block';

    // Clear existing modal content
    document.querySelector('.modalContent').innerHTML = '<span class="closeBtn">&times;</span>';

    // Load the embed content dynamically for the second chat
    let iframe = document.createElement('iframe');
    iframe.id = 'chatIframe2';
    iframe.src = 'https://www3.cbox.ws/box/?boxid=3520595&boxtag=KdKEOM';
    iframe.width = '100%';
    iframe.height = '93%';
    document.querySelector('.modalContent').appendChild(iframe);

    // Reattach close button listener
    document.querySelector('.closeBtn').addEventListener('click', function() {
        document.getElementById('chatModal').style.display = 'none';
    });
});