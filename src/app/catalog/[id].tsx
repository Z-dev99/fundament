export default async function ObjectDetailPage({
    params,
}: {
    params: { id: string };
}) {
    return <div>Детали объекта: {params.id}</div>;
}

export async function generateMetadata({
    params,
}: {
    params: { id: string };
}) {
    return {
        title: `Объект ${params.id}`,
    };
}
