// Handle chat button click for chatCont (first chat button)
document.querySelector('.chatCont').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from affecting the radio container

    // Open the chat in a new browser tab or window
    window.open('https://www6.cbox.ws/box/?boxid=830051&boxtag=PVzb5d', '_blank');
});

// Handle chat button click for chatCont2 (second chat button)
document.querySelector('.chatCont2').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent click from affecting the radio container

    // Open the second chat in a new browser tab or window
    window.open('https://www3.cbox.ws/box/?boxid=3520595&boxtag=KdKEOM', '_blank');
});