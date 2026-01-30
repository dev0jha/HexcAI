export abstract class HealthService {
  /*
   * health message
   * **/
  static async getStatus() {
    return {
      status: "ok",
      message: "Service is healthy",
    };
  }
}

export { AnalysisService } from "./analysis/analysis.service";
