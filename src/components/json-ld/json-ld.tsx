interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

// Renders one or more JSON-LD blocks. Server component — the script ships in
// the initial HTML for crawlers.
const JsonLd = ({ data }: JsonLdProps) => {
  const blocks = Array.isArray(data) ? data : [data]

  return (
    <>
      {blocks.map((block, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  )
}

export default JsonLd
