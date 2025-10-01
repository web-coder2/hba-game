{OVERALL_GAME_HEADER}

<div id="counter-container">
    <h3>Счетчик: <span id="counter-value">0</span></h3>
    <button id="increase-btn">Увеличить</button>
</div>

<script type="text/javascript">
    var counter = 0;
    document.getElementById('increase-btn').addEventListener('click', function () {
        counter++;
        document.getElementById('counter-value').innerText = counter;
    });
</script>

{OVERALL_GAME_FOOTER}
