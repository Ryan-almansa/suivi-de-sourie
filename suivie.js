const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const TAU = Math.PI * 2;
        const tentacles = [];
        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

        // Classe pour gérer les tentacules
        class Tentacle {
            constructor(x, y, length) {
                this.base = { x, y };
                this.points = [];
                this.length = length;
                for (let i = 0; i < length; i++) {
                    this.points.push({ x, y, angle: 0 });
                }
            }

            update(target) {
                let prev = target;
                this.points.forEach((point, i) => {
                    const dx = point.x - prev.x;
                    const dy = point.y - prev.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);

                    point.angle = angle;
                    point.x = prev.x + Math.cos(angle) * 20;
                    point.y = prev.y + Math.sin(angle) * 20;

                    prev = { ...point };
                });
            }

            draw() {
                ctx.beginPath();
                ctx.moveTo(this.base.x, this.base.y);
                this.points.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.strokeStyle = `hsl(${Math.random() * 360}, 100%, 70%)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }

        // Création des tentacules
        for (let i = 0; i < 20; i++) {
            tentacles.push(new Tentacle(canvas.width / 2, canvas.height / 2, 10));
        }

        // Mise à jour du canvas
        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            tentacles.forEach(tentacle => {
                tentacle.update(mouse);
                tentacle.draw();
            });

            requestAnimationFrame(animate);
        }

        // Suivre la souris
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Redimensionner le canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        animate();