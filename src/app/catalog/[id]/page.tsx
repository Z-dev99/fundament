import ObjectDetailClient from "./object-detail-client";

interface ObjectDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ObjectDetailPage({ params }: ObjectDetailPageProps) {
    const { id } = await params;
    return <ObjectDetailClient id={id} />;
}
