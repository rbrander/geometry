console.log('app.js');

var canvas, ctx, tickStart;
var numSides = 0;

function onResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function draw(tick) {
  // clear background
  ctx.fillStyle = '#007';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw the number of sides
  ctx.textBaseline = 'top';
  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(numSides.toString(), 20, 20);

  ctx.save();
  var thirdWidth = ~~(canvas.width / 3);
  var padding = 70;

  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'white';
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'white';

  switch (numSides) {
    case 0:
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2, true);
      ctx.fill();
      break;
    case 1:
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(padding, canvas.height - padding);
      ctx.lineTo(canvas.width - padding, canvas.height - padding);
      ctx.moveTo(padding, padding);
      ctx.lineTo(canvas.width - padding, padding);
      ctx.stroke();
      break;
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      var radius = (canvas.height / 2) - padding;
      var internalAngleRads = ((360 / numSides) * Math.PI / 180);

      var internalHeight = Math.sin(~~(numSides / 2) * internalAngleRads - (Math.PI / 2)) * radius + radius;
      var verticalOffset = (canvas.height - internalHeight) / 2;

      var centerX = canvas.width / 2;
      var centerY = verticalOffset + radius;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius);
      for (var i = 1; i <= numSides; i++)
        ctx.lineTo(
          centerX + Math.cos(i * internalAngleRads - (Math.PI / 2)) * radius,
          centerY + Math.sin(i * internalAngleRads - (Math.PI / 2)) * radius
        );

      ctx.stroke();
      break;

    default:
      break;
  }
  ctx.restore();
}

function update(tick) {
  var diff = tick - tickStart;
  numSides = ~~(diff / 1000);
  if (numSides > 10)
    numSides = 10;
}

function loop() {
  var tick = new Date().valueOf();
  update(tick);
  draw(tick);
  requestAnimationFrame(loop);
}

(function() {
  canvas = document.getElementById('canvas');
  window.addEventListener('resize', onResize);
  onResize();
  ctx = canvas.getContext('2d');

  tickStart = new Date().valueOf();
  requestAnimationFrame(loop);
})();
