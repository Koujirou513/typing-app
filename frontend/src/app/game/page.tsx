'use client';

import { useState, useEffect } from 'react';

export default function TypingApp() {
    const [challenge, setChallenge] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [score, setScore] = useState<number>(0);

    // タイピング問題をバックエンドから取得
    useEffect(() => {
        async function fetchChallenge() {
            const res = await fetch('http://localhost:8080/api/typing');
            const data = await res.json();
            setChallenge(data.text);
        }
        fetchChallenge();
    }, []);

    // 入力時の処理
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);
        console.log(challenge)
        if (value !== '' && e.target.value === challenge) {
            setScore((prevScore) => prevScore + 10); // 正解でスコア加算
            setInput('');         // 入力フィールドをリセット
        }
    };

    return (
        <div>
            <h1>Typing Challenge</h1>
            <p>{challenge}</p>
            <input
                type="text"
                value={input}
                onChange={(e) => handleChange(e)}
                placeholder='Start typing...'
                className='text-black'
            />
            <p>Score: {score}</p>
        </div>
    );
}