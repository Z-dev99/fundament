'use client';

export default function Error({ error }: { error: Error }) {
    return <div>Произошла ошибка: {error.message}</div>;
}
