import DataFrame from "dataframe-js";

export type DataType = "csv" | "tsv";

/**
 * Creates a new CSV Class from plain csv text. 
 * It uses dataframe-js to extract headers and data
 */
export class CSV {
  #df: DataFrame;
  dict;
  headers;
  data;

  private constructor(df: DataFrame) {
    this.#df = df;
    this.dict = df.toDict();
    this.headers = Object.keys(this.dict);
    this.data = df.toCollection();
  }

  static async initialize(data: string, type: DataType) {
    let df;
    if (type === "csv") {
      df = await DataFrame.fromCSV(new File([data], "file.csv"));
    } else if (type === "tsv") {
      df = await DataFrame.fromTSV(new File([data], "file.csv"));
    }

    return new CSV(df);
  }
}
