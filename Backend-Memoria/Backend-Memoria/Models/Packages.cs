using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend_Memoria.Models
{
    public class Packages
    {
        public int Id { get; set; }
        public string PackageType { get; set; }
        public string PackageInfo { get; set; }
        public int PackagePrice { get; set; }
        public int TitleSubtitleId { get; set; }
        public TitleSubtitle TitleSubtitle { get; set; }



        // Proprietate de navigare către lista de relații many-to-many
      
        public List<PackageService> PackageServices { get; set; }

        public List<Services> Services { get; set; }
    }
}
