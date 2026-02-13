export abstract class HealthService {
   /*
    * health message
    * **/
   static async getStatus() {
      return {
         status: "ok",
         message: "Service is healthy",
      }
   }
}

export { AnalysisService } from "./analysis/analysis.service"
export { DevelopersService } from "./developers/developers.service"
export { ProfileCreationService } from "./profile-creation.service"
export { UserService } from "./user/user.service"
