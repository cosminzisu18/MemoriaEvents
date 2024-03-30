using System.Text.Json.Serialization;
namespace Backend_Memoria.Models
{
    public class PricesCharacteristics
    {
        public int Id { get; set; }
        public string Characteristics { get; set; }

        public int PricesId { get; set; }
        [JsonIgnore]
        public Prices Prices { get; set; }
    }
}
