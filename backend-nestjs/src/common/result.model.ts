export class Result<T> {
  constructor(
    public EC: number,
    public DT: T,
    public EM: string,
  ) {}
}
