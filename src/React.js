import React from "react";

function App() {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <a href="#about">Про React</a>
                        </li>
                        <li>
                            <a href="#why-learn-react">Чому вивчати React</a>
                        </li>
                        <li>
                            <a href="#getting-started">Початок роботи з React</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <section id="hero">
                    <h1>Вивчення мов програмування з React</h1>
                    <p>
                        React - це потужна бібліотека JavaScript, яка дозволяє створювати
                        веб-інтерфейси, що реагують на зміни даних без перезавантаження
                        сторінки.
                    </p>
                    <a href="#getting-started">Почати вивчення React</a>
                </section>
                <section id="about">
                    <h2>Про React</h2>
                    <p>
                        React - це бібліотека JavaScript, створена компанією Facebook з метою
                        полегшення розробки веб-інтерфейсів.
                    </p>
                </section>
                <section id="why-learn-react">
                    <h2>Чому вивчати React?</h2>
                    <p>
                        Вивчення React дозволить вам швидко та легко створювати
                        динамічні веб-інтерфейси та додатки. React також дозволяє легко
                        відокремлювати логіку та відображення, що полегшує розробку та
                        підтримку коду.
                    </p>
                </section>
                <section id="getting-started">
                    <h2>Початок роботи з React</h2>
                    <p>
                        Для початку роботи з React вам знадобиться знання основ HTML, CSS та
                        JavaScript. Після цього ви можете встановити React за допомогою
                        пакетного менеджера npm та почати розроботу з різними компонентами бібліотеки, такими як JSX, компоненти класів та функцій, стилізація та багато іншого.
                    </p>
                    <a href="#about">Дізнатись більше про React</a>
                </section>
            </main>
            <footer>
                <p>Copyright © 2023</p>
            </footer>
        </div>
    );
}

export default App;