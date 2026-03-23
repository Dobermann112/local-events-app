type Props = {
  children: React.ReactNode
}

const PageContainer = ({ children }: Props) => {
  return (
    <div style={{ backgroundColor: "#F5F7FA", minHeight: "100vh" }}>
      <main
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "24px 16px",
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default PageContainer