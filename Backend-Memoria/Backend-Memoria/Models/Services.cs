using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend_Memoria.Models
{
    public class Services
    {
        public int Id { get; set; }
        public string Icon { get; set; }
        public string ServiceName { get; set; }
        public int TitleSubtitleId { get; set; }
        public TitleSubtitle TitleSubtitle { get; set; }

        // Proprietate de navigare către lista de relații many-to-many
        [JsonIgnore]
        public List<PackageService> PackageServices { get; set; }
    }
}
