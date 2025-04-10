import mongoose, { Document, Schema } from "mongoose";
import { IClause } from "./Contract";

export interface IContractTemplate extends Document {
  title: string;
  description: string;
  type: string;
  category: string;
  clauses: IClause[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ClauseSchema = new Schema<IClause>({
  title: {
    type: String,
    required: [true, "O título da cláusula é obrigatório"],
  },
  content: {
    type: String,
    required: [true, "O conteúdo da cláusula é obrigatório"],
  },
  order: {
    type: Number,
    required: true,
  },
});

const ContractTemplateSchema = new Schema<IContractTemplate>(
  {
    title: {
      type: String,
      required: [true, "O título do modelo é obrigatório"],
      trim: true,
      maxlength: [200, "O título não pode ter mais de 200 caracteres"],
    },
    description: {
      type: String,
      required: [true, "A descrição do modelo é obrigatória"],
      maxlength: [1000, "A descrição não pode ter mais de 1000 caracteres"],
    },
    type: {
      type: String,
      required: [true, "O tipo de contrato é obrigatório"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "A categoria do modelo é obrigatória"],
      trim: true,
    },
    clauses: [ClauseSchema],
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para melhorar a performance nas consultas
ContractTemplateSchema.index({ type: 1, category: 1 });
ContractTemplateSchema.index({ isPublic: 1 });

const ContractTemplate = mongoose.model<IContractTemplate>(
  "ContractTemplate",
  ContractTemplateSchema
);

export default ContractTemplate;
