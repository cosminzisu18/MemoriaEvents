using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Backend_Memoria.Models
{
    public class PackageService
    {
        public int Id { get; set; }
        public int PackageId { get; set; }

        // Exclude Package property from JSON serialization
        [JsonIgnore]
        public Packages Package { get; set; }

        public int ServiceId { get; set; }
        public Services Service { get; set; }
    }
}
