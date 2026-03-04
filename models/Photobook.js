module.exports = (sequelize, DataTypes) => {
  const Photobook = sequelize.define(
    "Photobook",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      nombreFotografe: DataTypes.STRING,
      apellidoFotografe: DataTypes.STRING,
      titulo: DataTypes.STRING,
      pais: DataTypes.STRING,
      ciudad: DataTypes.STRING,
      editorial: DataTypes.STRING,
      ano: DataTypes.INTEGER,
      texto: DataTypes.STRING,
      diseno: DataTypes.STRING,
      edicion: DataTypes.TEXT,
      copias: DataTypes.STRING,
      isbn: DataTypes.STRING,
      paginas: DataTypes.INTEGER,
      medidas: DataTypes.STRING,
      idioma: DataTypes.STRING,
      financiacion: DataTypes.STRING,
      imprenta: DataTypes.STRING,
      biblio: DataTypes.STRING,
      comentarios: DataTypes.TEXT,
      link: DataTypes.STRING,
      imagen: DataTypes.STRING,

      curated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      curatedOrder: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "photobooks",
      timestamps: false,
    }
  );

  return Photobook;
};
