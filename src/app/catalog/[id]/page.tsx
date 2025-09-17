import ObjectDetailClient from "./object-detail-client";

export default function ObjectDetailPage({ params }: { params: { id: string } }) {
    return <ObjectDetailClient id={params.id} />;
}
