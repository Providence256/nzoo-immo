using System;
using API.DTOs.CommuneDto;
using API.DTOs.DeviseDto;
using API.DTOs.EquipementDto;
using API.DTOs.RuleDto;
using API.DTOs.TypehebergementDto;
using API.DTOs.VilleDto;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Ville, VilleRequest>().ReverseMap();
        CreateMap<Commune, CommuneRequest>().ReverseMap();
        CreateMap<Commune, CommuneResponse>()
                            .ForMember(d => d.Ville, o => o.MapFrom(s => s.Ville.Designation))
                            .ReverseMap();
        CreateMap<Devise, DeviseRequest>().ReverseMap();
        CreateMap<Equipement, EquipementRequest>().ReverseMap();
        CreateMap<TypeHebergement, TypeHebergementRequest>().ReverseMap();
        CreateMap<Rule, RuleRequest>().ReverseMap();
    }
}
