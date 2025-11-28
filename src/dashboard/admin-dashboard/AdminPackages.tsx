import React from "react";

const shiningCompanyPackages = [
  {
    id: 1,
    name: "Plan Inicial",
    price: "49 USD/mes",
    category: "Esencial para Pequeñas Empresas",
    description:
      "Ideal para negocios pequeños y emprendedores en Cuba. Incluye herramientas básicas para comenzar a digitalizar procesos.",
    features: [
      "10 GB de Almacenamiento en la Nube",
      "Hasta 5 Usuarios",
      "Automatización Básica",
      "Soporte por Email y Chat",
      "Copias de Seguridad Diarias",
    ],
  },
  {
    id: 2,
    name: "Plan Empresarial",
    price: "129 USD/mes",
    category: "Crecimiento Profesional",
    description:
      "Diseñado para compañías en crecimiento que necesitan mayor capacidad, más usuarios y herramientas avanzadas.",
    features: [
      "100 GB de Almacenamiento",
      "Hasta 25 Usuarios",
      "Automatizaciones Avanzadas",
      "Control de Acceso por Roles",
      "Panel de Analíticas",
      "Soporte Prioritario",
    ],
  },
  {
    id: 3,
    name: "Plan Premium",
    price: "249 USD/mes",
    category: "Solución para Empresas Medianas",
    description:
      "Perfecto para organizaciones que requieren reportes avanzados, integraciones y mayor seguridad.",
    features: [
      "500 GB de Almacenamiento",
      "Usuarios Ilimitados",
      "Suite Completa de Automatización",
      "Integraciones Personalizadas (CRM, ERP)",
      "Registros de Auditoría",
      "Soporte 24/7",
    ],
  },
  {
    id: 4,
    name: "Suite Empresarial",
    price: "Precio Personalizado",
    category: "Solución Corporativa",
    description:
      "Paquete totalmente adaptable para grandes organizaciones en Cuba que requieren infraestructura dedicada y cumplimiento normativo.",
    features: [
      "Almacenamiento Ilimitado",
      "Gestor de Cuenta Dedicado",
      "Implementación Local o Híbrida",
      "Analíticas y Automatización con IA",
      "Soporte en Cumplimiento (GDPR, SOC2)",
      "Equipo de Ingeniería Disponible 24/7",
    ],
  },
];

const AdminPackages = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Shining Company — Paquetes</h2>

      {shiningCompanyPackages.map((pkg) => (
        <div
          key={pkg.id}
          style={{
            border: "1px solid #ddd",
            padding: "18px",
            marginTop: "20px",
            borderRadius: "10px",
            background: "#fafafa",
          }}
        >
          <h2>{pkg.name}</h2>
          <p><strong>Categoría:</strong> {pkg.category}</p>
          <p><strong>Precio:</strong> {pkg.price}</p>
          <p style={{ marginTop: "10px" }}>{pkg.description}</p>

          <h4 style={{ marginTop: "10px" }}>Características:</h4>
          <ul>
            {pkg.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminPackages;
