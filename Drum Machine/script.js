
const buttons = document.querySelectorAll('.drum-pad');

function play(audio) {
  audio.currentTime = 0;
  audio.play();
  const display = document.querySelector('#display');
  const button = audio.closest('.drum-pad');
  display.innerText = button.id;
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const audio = button.querySelector('audio');
    play(audio)
  });
});

document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const audio = document.getElementById(key);
    if (audio) {
      play(audio)

      const button = audio.closest('.drum-pad');
      if (button) {
        button.classList.add('hover');
      }
    }
  });

document.addEventListener('keyup', (e) => {
  const key = e.key.toUpperCase();
  const audio = document.getElementById(key);
  const button = audio.closest('.drum-pad');
  if (button) {
    button.classList.remove('hover');
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 150);
  }
});
