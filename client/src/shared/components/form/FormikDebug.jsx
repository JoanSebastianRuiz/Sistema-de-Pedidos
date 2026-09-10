import { useFormikContext } from 'formik';

const Section = ({ title, data }) => (
    <div>
        <div
            style={{
                color: '#7dd3fc',
                fontWeight: 700,
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                fontSize: 12,
            }}
        >
            {title}
        </div>

        <pre
            style={{
                margin: 0,
                padding: 12,
                background: '#0f172a',
                color: '#e2e8f0',
                border: '1px solid #334155',
                borderRadius: 8,
                overflowX: 'auto',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
            }}
        >
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
);

const FormikDebug = () => {
    const formik = useFormikContext();

    if (import.meta.env.VITE_ENVIRONMENT !== 'development') {
        return null;
    }

    return (
        <details
            open
            style={{
                marginTop: 24,
                padding: 16,
                background: '#020617',
                border: '1px solid #334155',
                borderRadius: 10,
                color: '#f8fafc',
                fontFamily: 'Consolas, Menlo, Monaco, monospace',
                fontSize: 13,
                boxShadow: '0 4px 16px rgba(0,0,0,.35)',
                width: '100%',
            }}
        >
            <summary
                style={{
                    cursor: 'pointer',
                    fontWeight: 700,
                    color: '#38bdf8',
                    fontSize: 15,
                    marginBottom: 16,
                    userSelect: 'none',
                }}
            >
                🐛 Formik Debug
            </summary>

            <div
                style={{
                    display: 'grid',
                    gap: 16,
                }}
            >
                <Section title="Values" data={formik.values} />

                <Section title="Errors" data={formik.errors} />

                <Section title="Touched" data={formik.touched} />
            </div>
        </details>
    );
};

export default FormikDebug;
