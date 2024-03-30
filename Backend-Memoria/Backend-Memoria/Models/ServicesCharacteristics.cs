using System.Text.Json.Serialization;

namespace Backend_Memoria.Models
{
    public class ServicesCharacteristics
    {
        public int Id { get; set; }
        public string Characteristics { get; set; }

        public int ServicesId { get; set; }
        [JsonIgnore]
        public Services Services { get; set; }
    }
}
