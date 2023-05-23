import React, { useState } from 'react';
import axios from 'axios';
import './css/Compiler.css';

function Compiler() {
    const [result, setResult] = useState('');
    const [code, setCode] = useState('');
    const template = `
      public class HelloWorld {
        public static void main(String[] args) {
          System.out.println(test());
        }
        ${code}
      }
    `;

    const compileCode = async (finalCode) => {
        try {
            const response = await axios.post(
                'https://api.jdoodle.com/v1/execute',
                {
                    script: finalCode,
                    language: 'java',
                    versionIndex: 3,
                    clientId: 'e23f56e872a9399c4968926fc7033cca',
                    clientSecret: '18d28e6561ee58c4f63c52c1d3058f84518f1bc089d28b1a355847b6cc294e8b',
                }
            );

            if (response.status === 200) {
                const result = response.data;
                // Обробка результату компіляції
                setResult(result.output);
            }
        } catch (error) {
            // Обробка помилки
            console.error(error);
        }
    };

    const handleCompile = () => {
        compileCode(template);
    };
    const handleChangeCode = (event) => {
        setCode(event.target.value);
    };
    return (
        <div className="Compiler">
            <div className="left">
                <h2>Theory</h2>
                <p>Some theoretical content goes here...</p>
            </div>
            <div className="middle">
                <h2>Code Input</h2>
                <textarea value={code} onChange={handleChangeCode} rows={10} cols={50} />
                <button onClick={handleCompile}>Compile</button>
            </div>
            <div className="right">
                <h2>Output</h2>
                <pre>{result}</pre>
            </div>
        </div>
    );
}

export default Compiler;