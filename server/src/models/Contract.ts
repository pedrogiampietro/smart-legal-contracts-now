import mongoose, { Document, Schema, Types } from "mongoose";

export interface IParty {
  name: string;
  email: string;
  documentType: "cpf" | "cnpj";
  documentNumber: string;
  signed: boolean;
  signedAt?: Date;
}

export interface IClause {
  title: string;
  content: string;
  order: number;
}

export type ContractStatus =
  | "draft"
  | "pending"
  | "active"
  | "expired"
  | "cancelled";

export interface IContract extends Document {
  title: string;
  description?: string;
  type: string;
  status: ContractStatus;
  parties: IParty[];
  clauses: IClause[];
  value?: number;
  startDate?: Date;
  endDate?: Date;
  createdBy: Types.ObjectId;
  content?: string;
  blockchainHash?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartySchema = new Schema<IParty>({
  name: {
    type: String,
    required: [true, "O nome da parte é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "O email da parte é obrigatório"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, informe um email válido",
    ],
  },
  documentType: {
    type: String,
    required: [true, "O tipo de documento é obrigatório"],
    enum: ["cpf", "cnpj"],
  },
  documentNumber: {
    type: String,
    required: [true, "O número do documento é obrigatório"],
  },
  signed: {
    type: Boolean,
    default: false,
  },
  signedAt: {
    type: Date,
  },
});

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

const ContractSchema = new Schema<IContract>(
  {
    title: {
      type: String,
      required: [true, "O título do contrato é obrigatório"],
      trim: true,
      maxlength: [200, "O título não pode ter mais de 200 caracteres"],
    },
    description: {
      type: String,
      maxlength: [1000, "A descrição não pode ter mais de 1000 caracteres"],
    },
    type: {
      type: String,
      required: [true, "O tipo de contrato é obrigatório"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["draft", "pending", "active", "expired", "cancelled"],
      default: "draft",
    },
    parties: [PartySchema],
    clauses: [ClauseSchema],
    value: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    blockchainHash: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Índice para melhorar a performance nas consultas
ContractSchema.index({ createdBy: 1, status: 1 });
ContractSchema.index({ "parties.email": 1 });

const Contract = mongoose.model<IContract>("Contract", ContractSchema);

export default Contract;
